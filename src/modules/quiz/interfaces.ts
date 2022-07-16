import { IBaseDataService, IGeneralServiceDependencies } from "@common/interfaces";
import { ISequelize } from "@configs/sequelize";

import { IQuestion, IQuestionInput } from "@modules/question/interfaces";

export interface IQuizDependencies extends IGeneralServiceDependencies<ISequelize> {
  moduleDataService: IBaseDataService<IQuiz>
}

export interface IQuiz {
  id: number
  account_id: number
  title: string
  link: string
  is_published: boolean
  Questions?: IQuestion[]
}

export interface IQuizInput extends Pick<IQuiz, 'title' | 'account_id'> {
  questions: IQuestionInput[]
}