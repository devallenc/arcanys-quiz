import { IQuiz, IQuizDependencies } from "../interfaces";

interface IUpdateQuizUseCaseDependecies extends IQuizDependencies {}

export class UpdateQuizUseCase {
  constructor(private dependencies: IUpdateQuizUseCaseDependecies) {}

  public execute = async (account_id: number, data: Partial<IQuiz>) => {
    const transaction = await this.dependencies.sequelize.transaction();
    try {
      const quiz = await this.dependencies.moduleDataService.getByAny({ account_id });
      if (!quiz) {
        throw new Error('Quiz doesnt exists.');
      }

      const updatedQuizObject = {
        ...quiz,
        ...data
      };

      await this.dependencies.moduleDataService.updateById({ id: quiz.id }, updatedQuizObject, transaction);
      
      await transaction.commit();

      return updatedQuizObject;

    } catch (error) {
      console.log('error @ UpdateQuizUseCase', error);

      await transaction.rollback();

      throw error;
    }
  }
}