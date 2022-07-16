import { IAccountDependencies } from "../interfaces";

export class DetailsAccountUseCase {
  constructor(private dependencies: IAccountDependencies) {}

  public execute = async (id: number) => {
    try {
      const account = await this.dependencies.moduleDataService.getById(id);
      return account;
    } catch (error) {
      console.log('error @ DetailsAccountUseCase', error);
      throw error;
    }
  }
}