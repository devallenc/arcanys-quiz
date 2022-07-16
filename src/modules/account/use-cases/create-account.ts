import { ICreateAccountPasswordUseCase } from "@modules/account-password/use-cases";
import { IAccountDependencies, IAccountInput } from "../interfaces";
import { ISendMail } from "../services/mailer";

interface ICreateAccountUseCaseDependecies extends IAccountDependencies {
  createAccountPasswordUseCase: ICreateAccountPasswordUseCase
  mailer: ISendMail
  randomNo: () => string
}

export class CreateAccountUseCase {
  constructor(private dependencies: ICreateAccountUseCaseDependecies) {}

  public execute = async (data: IAccountInput) => {
    const transaction = await this.dependencies.sequelize.transaction();
    try {
      const { email, password } = data;
      const emailExists = await this.dependencies.moduleDataService.getByAny({ email }).catch(() => null);
      if (emailExists) {
        throw new Error('Email already exists.');
      }
      
      const newAccount = await this.dependencies.moduleDataService.create({ 
        email, 
        is_verified: false, 
        verification_code: this.dependencies.randomNo(),
      }, transaction);
      
      await this.dependencies.createAccountPasswordUseCase({ account_id: newAccount.id, password });
      
      const url = await this.dependencies.mailer(newAccount);
      
      await transaction.commit();

      return { account: newAccount, url };

    } catch (error) {
      console.log('error @ CreateAccountUseCase', error);

      await transaction.rollback();

      throw error;
    }
  }
}