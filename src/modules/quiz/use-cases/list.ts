import { IQuizDependencies } from "../interfaces";

interface IQuizListDependencies extends IQuizDependencies {
}
export class ListUseCase {
  constructor(private dependencies: IQuizListDependencies) {}

  public execute = async (account_id: number) => {
    try {
      const list = await this.dependencies.moduleDataService.getAll({ account_id });
      console.log('list', list);
      return list;
    } catch (error) {
      console.log('error @ ListUseCase', error);
      throw error;
    }
  }
}