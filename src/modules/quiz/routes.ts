import { Router } from 'express';
import { QuizController } from './controller';

export class QuizRoute {

  private app: Router;
  private quizController = new QuizController();
  constructor () {
    this.app = Router({ mergeParams: true });
  }

  public expose() {
    this.app.get('/', this.quizController.list);
    this.app.post('/', this.quizController.createQuiz);

    return this.app;
  }
}
