import { IBaseDataService } from "@common/interfaces";
import { Transaction, where, WhereOptions } from "sequelize/types";
import { AccountModel } from "..";
import { IAccount } from "../interfaces";

export default class AccountService implements IBaseDataService<IAccount> {

  private convertToJSON(account: AccountModel|null) {
    if (!account) {
      throw new Error('Account not found.');
    }

    return account.toJSON();
  }

  async create (data: Omit<IAccount,'id'>, transaction: Transaction) {
    return this.convertToJSON(await AccountModel.create(data, { transaction }));
  }

  async createMany(data: Omit<IAccount, 'id'>[], transaction: Transaction) {
    const result = await AccountModel.bulkCreate(data, { transaction });
    const mappedResult = result.map((data) => this.convertToJSON(data));
    return mappedResult
  }

  async getById (id: number) {
    return this.convertToJSON(await AccountModel.findByPk(id));
  }

  async getByAny(whereOptions: WhereOptions<IAccount>) {
    return this.convertToJSON(await AccountModel.findOne({ where: whereOptions }));
  }

  async updateById (whereOptions: WhereOptions<IAccount>, data: Omit<IAccount, 'id'>, transaction: Transaction) {
    return AccountModel.update({ ...data }, { where: whereOptions, transaction });
  }

  async getAll(whereOptions: WhereOptions<IAccount>): Promise<IAccount[]> {
    const list = await AccountModel.findAll({ where: whereOptions })
    const mappedResult = list.map((data) => this.convertToJSON(data));
    return mappedResult;
  }
  
}