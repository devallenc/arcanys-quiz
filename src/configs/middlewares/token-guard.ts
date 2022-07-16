import { NextFunction, Request, RequestHandler, Response } from "express";

import TokenService from "@modules/account/services/token";

export const tokenGuard = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('token', token);

  if (!token) {
    return res.status(400).json({ success: false, message: 'ACCESS RESTRICTED' });
  }

  const decoded = await new TokenService().verify(token);

  res.locals.account = decoded;
  
  next();
};