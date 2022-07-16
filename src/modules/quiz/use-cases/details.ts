import { IQuizDependencies } from "../interfaces";

export class DetailsQuizUseCase {
  constructor(private dependencies: IQuizDependencies) {}

  public execute = async (id: number) => {
    try {
      const quiz = await this.dependencies.moduleDataService.getByAny({ id });
      return quiz;
    } catch (error) {
      console.log('error @ DetailsAccountUseCase', error);
      throw error;
    }
  }
}