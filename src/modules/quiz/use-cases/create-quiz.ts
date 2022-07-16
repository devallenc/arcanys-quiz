import { IQuizDependencies, IQuizInput } from "../interfaces";

import { ICreateQuestionUseCase } from "@modules/question/use-cases";
import { ICreateAnswerChoiceUseCase } from "@modules/answer-choice/use-cases";
import { IAnswerChoiceInput } from "@modules/answer-choice/interfaces";

interface ICreateQuizUseCaseDependencies extends IQuizDependencies {
  createQuestionUseCase: ICreateQuestionUseCase
  createAnswerChoiceUseCase: ICreateAnswerChoiceUseCase
}

export class CreateQuizUseCase {
  constructor(private dependencies: ICreateQuizUseCaseDependencies) {}

  public execute = async (data: IQuizInput) => {
    const transaction = await this.dependencies.sequelize.transaction();
    try {
      const { account_id, title, questions } = data;
      const titleExists = await this.dependencies
        .moduleDataService.getByAny({ title }).catch(() => null);

      if (titleExists) {
        throw new Error('Quiz title already used.');
      }
      
      const newQuiz = await this.dependencies.moduleDataService
        .create({
          account_id,
          title,
          is_published: false,
          link: "",
        }, 
        transaction);

      const mappedQuestions = questions.map((question) => {
        return {
          quiz_id: newQuiz.id,
          type: question.type,
          text_display: question.text_display,
          is_deleted: false
        }
      });
      
      const newQuestions = await this.dependencies.createQuestionUseCase(mappedQuestions);

      if (newQuestions && newQuestions?.length > 0) {
        for (let i = 0; i < newQuestions.length; i++) {
          const newAnswerChoices = await this.dependencies.createAnswerChoiceUseCase(
            questions[i].answer_choices.map((answer) => ({
              ...answer,
              question_id: newQuestions[i].id,
              is_deleted: false
            }))
          );
        }
      }
      
      await transaction.commit();

      return newQuiz;

    } catch (error) {
      console.log('error @ CreateQuizUseCase', error);

      await transaction.rollback();

      throw error;
    }
  }
}