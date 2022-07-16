import { IBaseDataService } from "@common/interfaces";
import { Transaction, WhereOptions } from "sequelize/types";
import { QuestionModel } from "..";
import { IQuestion } from "../interfaces";

export default class QuestionService implements IBaseDataService<IQuestion> {

  private convertToJSON(account: QuestionModel|null) {
    if (!account) {
      throw new Error('Question not found.');
    }

    return account.toJSON();
  }

  async create (data: Omit<IQuestion,'id'>, transaction: Transaction) {
    return this.convertToJSON(await QuestionModel.create(data, { transaction }));
  }

  async createMany(data: Omit<IQuestion, 'id'>[], transaction: Transaction) {
    const result = await QuestionModel.bulkCreate(data, { transaction });
    const mappedResult = result.map((data) => this.convertToJSON(data));
    return mappedResult
  }

  async getById (id: number) {
    return this.convertToJSON(await QuestionModel.findByPk(id));
  }

  async getByAny(whereOptions: WhereOptions<IQuestion>) {
    return this.convertToJSON(await QuestionModel.findOne({ where: whereOptions }));
  }

  async updateById (whereOptions: WhereOptions<IQuestion>, data: Omit<IQuestion, 'id'>) {
    return QuestionModel.update({ ...data }, { where: whereOptions });
  }

  async getAll(whereOptions: WhereOptions<IQuestion>): Promise<IQuestion[]> {
    const list = await QuestionModel.findAll({ where: whereOptions })
    return list;
  }

}