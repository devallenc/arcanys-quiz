import { 
  IAccountPasswordInput,
  IAccountPasswordDependencies,
  IAccountPassword,
} from "../interfaces";

import { IBcryptService } from "../services";

interface ICreateAccountPasswordUseCaseDependecies extends IAccountPasswordDependencies {
  bcryptService: IBcryptService
} 

export interface ICreateAccountPasswordUseCase {
  (data: IAccountPasswordInput) : Promise<IAccountPassword> 
}

export class CreateAccountPasswordUseCase {
  constructor(private dependencies: ICreateAccountPasswordUseCaseDependecies) {}

  public execute = async (data: IAccountPasswordInput) => {
    const transaction = await this.dependencies.sequelize.transaction();
    try {
      const { account_id, password } = data;
      const hashedPassword = await this.dependencies.bcryptService.hashPassword(password);
      const accountPassword = await this.dependencies.moduleService.create(account_id, hashedPassword, transaction);

      await transaction.commit();

      return accountPassword;

    } catch (error) {
      console.log('error @ CreateAccountPasswordUseCase', error);
      
      await transaction.rollback();

      throw error;
    }
  }
}