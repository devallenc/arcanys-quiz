import { Transaction, WhereOptions } from "sequelize/types";

export interface IGeneralServiceDependencies<T> {
  sequelize: T
}

export interface IBaseDataService<T> {
  create (data: Omit<T, 'id'>, transaction: Transaction) : Promise<T>;
  getById (id: number) : Promise<T|undefined>;
  getByAny (whereOptions: Partial<T>) : Promise<T>;
  updateById (whereOptions: WhereOptions<T>, data: Omit<T, 'id'>, transaction: Transaction) : Promise<[number]>
  getAll (whereOptions: WhereOptions<T>) : Promise<T[]>
  createMany (data: Omit<T, 'id'>[], transaction: Transaction) : Promise<T[]>
}