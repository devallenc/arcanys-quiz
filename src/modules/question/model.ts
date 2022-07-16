import { SequelizeConnection } from '@configs/sequelize';
import { Model, DataTypes, Optional } from 'sequelize'

import { IQuestion, IType } from './interfaces';

export interface IQuestionInput extends Optional<IQuestion, 'id'> {}

class Question extends Model<IQuestion, IQuestionInput> implements IQuestion {
  id!: number;
  quiz_id!: number;
  type!: IType;
  text_display!: string;
  is_deleted!: boolean
}

Question.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quiz_id: {
    type: DataTypes.INTEGER
  },
  type: {
    type: DataTypes.INTEGER,
  },
  text_display: {
    type: DataTypes.STRING
  },
  is_deleted: {
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize: SequelizeConnection
});

export default Question;