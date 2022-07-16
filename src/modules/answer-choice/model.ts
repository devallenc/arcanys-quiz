import { SequelizeConnection } from '@configs/sequelize';
import { Model, DataTypes, Optional } from 'sequelize'

import { IAnswerChoice } from './interfaces';

export interface IAnswerChoiceInput extends Optional<IAnswerChoice, 'id'> {}

class AnswerChoice extends Model<IAnswerChoice, IAnswerChoiceInput> implements IAnswerChoice {
  id!: number;
  question_id!: number;
  text_display!: string;
  is_correct_answer!: boolean;
  is_deleted!: boolean;
}

AnswerChoice.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question_id: {
    type: DataTypes.INTEGER,
  },
  text_display: {
    type: DataTypes.STRING
  },
  is_correct_answer: {
    type: DataTypes.BOOLEAN
  },
  is_deleted: {
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize: SequelizeConnection
});

export default AnswerChoice;