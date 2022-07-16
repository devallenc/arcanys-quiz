import { IAnswerChoice, IAnswerChoiceDependencies, IAnswerChoiceInput } from "../interfaces";

interface ICreateAnswerChoiceUseCaseDependencies extends IAnswerChoiceDependencies {}

export interface ICreateAnswerChoiceUseCase {
  (data: Omit<IAnswerChoice, 'id'>[]) : Promise<IAnswerChoice[] | undefined>
}

export class CreateAnswerChoiceUseCase {
  constructor(private dependencies: ICreateAnswerChoiceUseCaseDependencies) {}

  public execute = async (data: Omit<IAnswerChoice, 'id'>[]) => {
    const transaction = await this.dependencies.sequelize.transaction();
    try {
      const newAnswerChoices = await this.dependencies.moduleDataService.createMany?.(data, transaction);
      
      await transaction.commit();

      return newAnswerChoices;

    } catch (error) {
      console.log('error @ CreateAnswerChoiceUseCase', error);

      await transaction.rollback();

      throw error;
    }
  }
}