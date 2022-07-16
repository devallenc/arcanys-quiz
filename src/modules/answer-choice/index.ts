import { SequelizeConnection } from "@configs/sequelize";

import AnswerChoiceModel from "./model";
import AnswerChoiceDataService from "./services/data-access-services";

import {
  CreateAnswerChoiceUseCase,
  ListAnswerChoiceUseCase
} from './use-cases'

const sequelize = SequelizeConnection;
const moduleDataService = new AnswerChoiceDataService();

export const createAnswerChoice = () => (
  new CreateAnswerChoiceUseCase({
    sequelize,
    moduleDataService,
  })
)

export const listAnswerChoice = () => (
  new ListAnswerChoiceUseCase({
    sequelize,
    moduleDataService,
  })
)


export { AnswerChoiceModel };