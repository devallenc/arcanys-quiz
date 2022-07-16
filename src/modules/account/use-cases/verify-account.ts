import { IAccount, IAccountDependencies } from "../interfaces";

interface IUpdateAccountUseCaseDependecies extends IAccountDependencies {}

export class VerifyAccountUseCase {
  constructor(private dependencies: IUpdateAccountUseCaseDependecies) {}

  public execute = async (id: number, verification_code: string) => {
    const transaction = await this.dependencies.sequelize.transaction();
    try {
      const account = await this.dependencies.moduleDataService
        .getByAny({ id, verification_code });

      if (!account) {
        throw new Error('Account doesnt exists.');
      }

      const updatedAccountObject = {
        ...account,
        is_verified: true
      };

      await this.dependencies.moduleDataService
        .updateById({ id: account.id }, updatedAccountObject, transaction);
      
      await transaction.commit();

      return updatedAccountObject;

    } catch (error) {
      console.log('error @ UpdateAccountUseCase', error);

      await transaction.rollback();

      throw error;
    }
  }
}