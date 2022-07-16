import { Transaction } from "sequelize/types";
import { AccountPasswordModel } from "..";
import { IAccountPassword, IAccountPasswordDataService } from "../interfaces";

export default class AccountPasswordDataService implements IAccountPasswordDataService<IAccountPassword> {

  async create (account_id: number, password: string, transaction: Transaction) {
    return (await AccountPasswordModel.create({ account_id, password }, { transaction })).toJSON();
  }

  async getAccountPasswordById (id: number) {
    return (await AccountPasswordModel.findByPk(id))?.toJSON();
  }
}