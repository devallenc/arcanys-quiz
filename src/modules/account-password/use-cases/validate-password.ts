import { 
  IAccountPasswordInput,
  IAccountPasswordDependencies,
  IAccountPassword,
} from "../interfaces";

import { IBcryptService } from "../services";

interface IValidateAccountPasswordUseCaseDependecies extends IAccountPasswordDependencies {
  bcryptService: IBcryptService
} 

export interface IValidateAccountPasswordUseCase {
  (data: IAccountPasswordInput) : Promise<IAccountPassword> 
}

export class ValidateAccountPasswordUseCase {
  constructor(private dependencies: IValidateAccountPasswordUseCaseDependecies) {}

  public execute = async (data: IAccountPasswordInput) => {
    const transaction = await this.dependencies.sequelize.transaction();
    try {
      const { account_id, password } = data;
      const accountPassword = await this.dependencies.moduleService.getAccountPasswordById(account_id);
      if (!accountPassword) {
        throw new Error('Account doesnt exists.');
      }

      const result = await this.dependencies.bcryptService.comparePassword(password, accountPassword?.password);
      if (!result) {
        throw new Error('Credentials not match.');
      }

      await transaction.commit();

      return accountPassword;

    } catch (error) {
      console.log('error @ CreateAccountPasswordUseCase', error);
      
      await transaction.rollback();

      throw error;
    }
  }
}