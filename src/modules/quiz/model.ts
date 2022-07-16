import { SequelizeConnection } from '@configs/sequelize';
import { DataTypes, Model, Optional } from 'sequelize'

import { IQuiz } from './interfaces';

export interface IQuizInput extends Optional<IQuiz, 'id'> {}

class Quiz extends Model<IQuiz, IQuizInput> implements IQuiz {
  id!: number;
  account_id!: number;
  title!: string;
  link!: string;
  is_published!: boolean;
}

Quiz.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_id: {
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING,
  },
  link: {
    type: DataTypes.STRING
  },
  is_published: {
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize: SequelizeConnection
});

export default Quiz;