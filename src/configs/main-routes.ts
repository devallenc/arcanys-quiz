import { Router } from 'express'
import { AccountRoute } from '@modules/account/routes';
import { QuizRoute } from '@modules/quiz/routes';
import { tokenGuard } from './middlewares/token-guard';

export class MainRoute {
  private app: Router;
  
  constructor() {
    this.app = Router({ mergeParams: true});
  }

  public expose() {
    this.app.use('/expose-api', new AccountRoute().expose());
    this.app.use('/api', tokenGuard, this.routes());
    return this.app;
  }

  private routes = () => {
    const router = Router({ mergeParams: true});

    router.use('/quizzes', new QuizRoute().expose());

    return router;
  }
}