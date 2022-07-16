import { IGeneralServiceDependencies } from "@common/interfaces";
import { ISequelize } from "@configs/sequelize";
import { IAccount } from "@modules/account/interfaces";
import { Transaction } from "sequelize/types";

export interface IAccountPassword {
  id: number
  account_id: number
  password: string
}

export interface IAccountPasswordInput extends Omit<IAccountPassword, 'id' > {}

export interface IAccountPasswordDataService<T> {
  create (account_id: number, password: string, transation: Transaction) : Promise<T>;
  getAccountPasswordById (id: number) : Promise<T|undefined>;
}

export interface IAccountPasswordDependencies extends IGeneralServiceDependencies<ISequelize> {
  moduleService: IAccountPasswordDataService<IAccountPassword>
}