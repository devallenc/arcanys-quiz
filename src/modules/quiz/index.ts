import { SequelizeConnection } from "@configs/sequelize";

import QuizModel from "./model";
import QuizService from "./services/data-access-services";

import {
  CreateQuizUseCase,
  ListUseCase,
  DetailsQuizUseCase
} from "./use-cases";

const sequelize = SequelizeConnection;
const moduleDataService = new QuizService();

import { createQuestion } from "@modules/question";
import { createAnswerChoice } from "@modules/answer-choice";


export const createQuiz = () => (
  new CreateQuizUseCase({
    sequelize,
    moduleDataService,
    createQuestionUseCase: createQuestion().execute,
    createAnswerChoiceUseCase: createAnswerChoice().execute
  })
)

export const listQuiz = () => (
  new ListUseCase({
    sequelize,
    moduleDataService
  })
)

export const detailsQuiz = () => (
  new DetailsQuizUseCase({
    sequelize,
    moduleDataService
  })
)

export { QuizModel };