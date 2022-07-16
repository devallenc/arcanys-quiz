import { SequelizeConnection } from '@configs/sequelize';
import AccountPasswordModel from './model'

import AccountPasswordDataService from './services/data-access-services';
import BcryptService from './services/encryptor';

import {
  CreateAccountPasswordUseCase,
  ValidateAccountPasswordUseCase
} from './use-cases'

const moduleService = new AccountPasswordDataService()
const sequelize = SequelizeConnection
    
export const createAccountPassword = () => (
  new CreateAccountPasswordUseCase({
    moduleService,
    bcryptService: new BcryptService(),
    sequelize
  })
)

export const validateAccountPassword = () => (
  new ValidateAccountPasswordUseCase({
    moduleService,
    bcryptService: new BcryptService(),
    sequelize
  })
)
export { AccountPasswordModel };
