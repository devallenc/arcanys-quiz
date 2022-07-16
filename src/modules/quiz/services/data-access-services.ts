import { IBaseDataService } from "@common/interfaces";
import { AnswerChoiceModel } from "@modules/answer-choice";
import { QuestionModel } from "@modules/question";
import { Transaction, WhereOptions } from "sequelize/types";
import { QuizModel } from "..";
import { IQuiz } from "../interfaces";

export default class QuizService implements IBaseDataService<IQuiz> {

  private convertToJSON(account: QuizModel|null) {
    if (!account) {
      throw new Error('Quiz not found.');
    }

    return account.toJSON();
  }

  async create (data: Omit<IQuiz,'id'>, transaction: Transaction) {
    return this.convertToJSON(await QuizModel.create(data, { transaction }));
  }

  async createMany(data: Omit<IQuiz, 'id'>[], transaction: Transaction) {
    const result = await QuizModel.bulkCreate(data, { transaction });
    const mappedResult = result.map((data) => this.convertToJSON(data));
    return mappedResult
  }

  async getById (id: number) {
    return this.convertToJSON(await QuizModel.findByPk(id));
  }

  async getByAny(whereOptions: WhereOptions<IQuiz>) {
    return this.convertToJSON(await QuizModel.findOne({ where: whereOptions }));
  }

  async updateById (whereOptions: WhereOptions<IQuiz>, data: Omit<IQuiz, 'id'>) {
    return QuizModel.update({ ...data }, { where: whereOptions });
  }

  async getAll(whereOptions: WhereOptions<IQuiz>): Promise<IQuiz[]> {
    QuizModel.hasMany(QuestionModel, {foreignKey: "quiz_id" })
    QuestionModel.belongsTo(QuizModel, {foreignKey: "quiz_id"})
    
    QuestionModel.hasMany(AnswerChoiceModel, {foreignKey: "question_id"})
    AnswerChoiceModel.belongsTo(QuestionModel, {foreignKey: "question_id"})

    const list = await QuizModel.findAll({ 
      where: whereOptions, 
      include: [{ 
        model: QuestionModel, as: 'Questions',
        include: [{
          model: AnswerChoiceModel, as: 'AnswerChoices'
        }]
      }] 
    });

    const mappedResult = list.map((data) => this.convertToJSON(data));
    return mappedResult
  }
  
}