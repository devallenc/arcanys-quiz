import { IBaseDataService, IGeneralServiceDependencies } from "@common/interfaces";
import { ISequelize } from "@configs/sequelize";
import { IAnswerChoiceInput } from "@modules/answer-choice/interfaces";

export interface IQuestionDependencies extends IGeneralServiceDependencies<ISequelize> {
  moduleDataService: IBaseDataService<IQuestion>
}

export enum IType {
  SINGLE_CORRECT_ANSWER = 1,
  MULTPLE_CORRECT_ANSWERS = 2,
}

export interface IQuestion {
  id: number
  quiz_id: number
  type: IType
  text_display: string
  is_deleted: boolean
}

export interface IQuestionInput extends Omit<IQuestion, 'id'> {
  answer_choices: IAnswerChoiceInput[]
}
