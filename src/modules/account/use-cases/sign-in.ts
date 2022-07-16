import { IValidateAccountPasswordUseCase } from "@modules/account-password/use-cases/validate-password";
import { IAccountDependencies, IAccountInput } from "../interfaces";
import { ITokenService } from "../services/token";

interface ISignInUseCaseDependecies extends IAccountDependencies {  
  validateAccountPasswordUseCase: IValidateAccountPasswordUseCase
  tokenService: ITokenService
}

export class SignInUseCase {
  constructor(private dependencies: ISignInUseCaseDependecies) {}

  public execute = async (data: IAccountInput) => {
    const transaction = await this.dependencies.sequelize.transaction();

    try {
      const { email, password } = data;
      const account = await this.dependencies.moduleDataService.getByAny({ email });
      if (!account.is_verified) {
        throw new Error('Account not yet verified. Please check your email to verify your account.');
      }

      await this.dependencies.validateAccountPasswordUseCase({ 
        account_id: account.id, 
        password
      });

      await transaction.commit();

      return { account, ...this.dependencies.tokenService.generate(account, 60 * 60) };

    } catch (error) {
      console.log('error @ SignInUseCase', error);

      await transaction.rollback();

      throw error;
    }
  }
}