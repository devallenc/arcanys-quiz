import { IQuestion, IQuestionDependencies, IQuestionInput } from "../interfaces";

interface ICreateQuestionUseCaseDependencies extends IQuestionDependencies {}

export interface ICreateQuestionUseCase {
  (data: Omit<IQuestion, 'id'>[]) : Promise<IQuestion[] | undefined>
}

export class CreateQuestionUseCase {
  constructor(private dependencies: ICreateQuestionUseCaseDependencies) {}

  public execute = async (data: Omit<IQuestion, 'id'>[]) => {
    const transaction = await this.dependencies.sequelize.transaction();
    try {
      const newQuestion = await this.dependencies.moduleDataService
        .createMany?.(data, transaction);
      
      await transaction.commit();

      return newQuestion;

    } catch (error) {
      console.log('error @ CreateQuestionUseCase', error);

      await transaction.rollback();

      throw error;
    }
  }
}