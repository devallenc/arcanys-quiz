import { IBaseDataService, IGeneralServiceDependencies } from "@common/interfaces";
import { ISequelize } from "@configs/sequelize";

export interface IAnswerChoiceDependencies extends IGeneralServiceDependencies<ISequelize> {
  moduleDataService: IBaseDataService<IAnswerChoice>
}

export interface IAnswerChoice {
  id: number
  question_id: number
  text_display: string
  is_correct_answer: boolean
  is_deleted: boolean
} 

export interface IAnswerChoiceInput extends Omit<IAnswerChoice, 'id' > {} 