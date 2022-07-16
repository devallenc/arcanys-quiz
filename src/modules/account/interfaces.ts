import { IBaseDataService, IGeneralServiceDependencies } from "@common/interfaces";
import { ISequelize } from "@configs/sequelize";

export interface IAccount {
  id: number
  email: string
  is_verified: boolean
  verification_code: string
}

export interface IAccountInput extends Pick<IAccount, 'email'> {
  password: string
}

export interface IAccountDependencies extends IGeneralServiceDependencies<ISequelize> {
  moduleDataService: IBaseDataService<IAccount>
}