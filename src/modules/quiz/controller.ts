import { listAnswerChoice } from '@modules/answer-choice';
import { Request, Response } from 'express';

import { 
  createQuiz,
  listQuiz,
  detailsQuiz
} from '.';



export class QuizController {
  public list = async (req: Request, res: Response) => {
    try {
      const { account } = res.locals;
      const result = await listQuiz().execute(+account.id);
      res.status(200).json({ 
        success: true, 
        data: result
      });

    } catch (error) {
      console.log('error @ signUp', error);
      res.status(400).json({ success: false, message: error.message });
    }
  }

  public createQuiz = async (req: Request, res: Response) => {
    try {
      const { account } = res.locals;
      const { title, questions } = req.body;

      const result = await createQuiz().execute({
        account_id: +account.id, 
        title,
        questions
      });

      res.status(200).json({ 
        success: true, 
        data: result
      });

    } catch (error) {
      console.log('error @ verifyQuiz', error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
