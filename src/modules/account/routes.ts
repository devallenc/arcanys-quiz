import { Router } from 'express';
import { AccountController } from './contoller';

export class AccountRoute {

  private app: Router;
  private accountController = new AccountController();
  constructor () {
    this.app = Router({ mergeParams: true });
  }

  public expose() {
    this.app.post('/sign-up', this.accountController.signUp);
    this.app.post('/sign-in', this.accountController.signIn);
    this.app.get('/verify/:id/:verification_code', this.accountController.verifyAccount);
    return this.app;
  }
}
