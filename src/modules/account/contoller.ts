import { Request, Response } from 'express';

import { 
  createAccount, 
  verifyAccount, 
  signIn 
} from '.';

export class AccountController {
  public signUp = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await createAccount().execute({ email, password });
      res.status(200).json({ 
        success: true, 
        data: result
      });

    } catch (error) {
      console.log('error @ signUp', error);
      res.status(400).json({ success: false, message: error.message });
    }
  }

  public verifyAccount = async (req: Request, res: Response) => {
    try {
      const { id, verification_code } = req.params;
      const result = await verifyAccount().execute(+id, verification_code);

      res.status(200).json({ 
        success: true, 
        data: result
      });

    } catch (error) {
      console.log('error @ verifyAccount', error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
  public signIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await signIn().execute({ email, password });
      res.status(200).json({ 
        success: true, 
        data: result
      });

    } catch (error) {
      console.log('error @ signIn', error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
