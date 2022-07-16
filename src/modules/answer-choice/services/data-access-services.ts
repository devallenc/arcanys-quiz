import { IBaseDataService } from "@common/interfaces";
import { Transaction, WhereOptions } from "sequelize/types";
import { AnswerChoiceModel } from "..";
import { IAnswerChoice } from "../interfaces";

export default class AnswerChoiceDataService implements IBaseDataService<IAnswerChoice> {

  private convertToJSON(account: AnswerChoiceModel|null) {
    if (!account) {
      throw new Error('AnswerChoice not found.');
    }

    return account.toJSON();
  }

  async create (data: Omit<IAnswerChoice,'id'>, transaction: Transaction) {
    return this.convertToJSON(await AnswerChoiceModel.create(data, { transaction }));
  }

  async createMany(data: Omit<IAnswerChoice, 'id'>[], transaction: Transaction) {
    const result = await AnswerChoiceModel.bulkCreate(data, { transaction });
    const mappedResult = result.map((data) => this.convertToJSON(data));
    return mappedResult
  }

  async getById (id: number) {
    return this.convertToJSON(await AnswerChoiceModel.findByPk(id));
  }

  async getByAny(whereOptions: WhereOptions<IAnswerChoice>) {

    return this.convertToJSON(await AnswerChoiceModel.findOne({ where: whereOptions }));
  }

  async updateById (whereOptions: WhereOptions<IAnswerChoice>, data: Omit<IAnswerChoice, 'id'>) {
    return AnswerChoiceModel.update({ ...data }, { where: whereOptions });
  }

  async getAll(whereOptions: WhereOptions<IAnswerChoice>): Promise<IAnswerChoice[]> {
    const list = await AnswerChoiceModel.findAll({ where: whereOptions })
    const mappedResult = list.map((data) => this.convertToJSON(data));
    return mappedResult;
  }

}