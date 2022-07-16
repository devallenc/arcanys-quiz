import { SequelizeConnection } from '@configs/sequelize';
import { DataTypes, Model, Optional } from 'sequelize'

import { IAccountPassword } from './interfaces';

export interface IAccountPasswordInput extends Optional<IAccountPassword, 'id'> {}

class AccountPassword extends Model<IAccountPassword, IAccountPasswordInput> implements IAccountPassword {
  id!: number;
  account_id!: number;
  password!: string;
}

AccountPassword.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_id: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  sequelize: SequelizeConnection
});

export default AccountPassword;