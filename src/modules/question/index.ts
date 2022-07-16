import { SequelizeConnection } from "@configs/sequelize";

import QuestionModel from "./model";
import QuestionService from "./services/data-access-services";

const sequelize = SequelizeConnection;
const moduleDataService = new QuestionService();

import {
  CreateQuestionUseCase
} from './use-cases';

export const createQuestion = () => (
  new CreateQuestionUseCase({
    sequelize,
    moduleDataService
  })
)

export { QuestionModel };

