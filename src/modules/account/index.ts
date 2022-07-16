import * as rs from 'randomstring';

import AccountModel from './model'
import AccountDataService from './services/data-access-services';
import MailerService from './services/mailer';
import TokenService from './services/token'

import {
  CreateAccountUseCase,
  VerifyAccountUseCase,
  DetailsAccountUseCase,
  SignInUseCase
} from './use-cases'

import { createAccountPassword, validateAccountPassword } from '@modules/account-password';
import { SequelizeConnection } from '@configs/sequelize';

const sequelize = SequelizeConnection;
const moduleDataService = new AccountDataService();

export const createAccount = () => (
  new CreateAccountUseCase({
    moduleDataService,
    createAccountPasswordUseCase: createAccountPassword().execute,
    sequelize,
    mailer: new MailerService().send,
    randomNo: () => rs.generate({ charset: "numberic", length: 5, capitalization: 'uppercase' })
  })
)

export const detailsAccount = () => new DetailsAccountUseCase({ moduleDataService, sequelize })
export const verifyAccount = () => new VerifyAccountUseCase({ moduleDataService, sequelize })

export const signIn = () => (
  new SignInUseCase({
    moduleDataService,
    sequelize,
    tokenService: new TokenService(),
    validateAccountPasswordUseCase: validateAccountPassword().execute,
  })
)

export { AccountModel };
