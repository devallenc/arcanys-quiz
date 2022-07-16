import { SequelizeConnection } from '@configs/sequelize';
import { DataTypes, Model, Optional } from 'sequelize'

import { IAccount } from './interfaces';

export interface IAccountInput extends Optional<IAccount, 'id'> {}

class Account extends Model<IAccount, IAccountInput> implements IAccount {
  id!: number;
  email!: string;
  is_verified!: boolean;
  verification_code!: string;
}

Account.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
  },
  is_verified: {
    type: DataTypes.BOOLEAN
  },
  verification_code: {
    type: DataTypes.STRING
  }
}, {
  sequelize: SequelizeConnection
});

export default Account;