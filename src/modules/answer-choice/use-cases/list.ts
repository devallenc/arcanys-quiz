import { IAnswerChoiceDependencies } from "../interfaces";

export class ListAnswerChoiceUseCase {
  constructor(private dependencies: IAnswerChoiceDependencies) {}
  public execute = async (question_id: number) => {
    try {
      const list = await this.dependencies.moduleDataService.getAll({ question_id });
      console.log('list', list);
      return list;
    } catch (error) {
      console.log('error @ ListAnswerChoiceUseCase', error);
      throw error;
    }
  }
}