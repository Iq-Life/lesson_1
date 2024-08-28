import { NextFunction, Request, Response } from 'express';
import { loginPassword } from '../db/db';
import { converStringIntoBase64 } from '../helpers/helpers';
import { HttpCodes } from '../videos/enums/global-enum';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'] as string
  
  if(!auth || !auth.includes('Basic ')) {
    res
    .send(HttpCodes.Unauthorized)
    .json({})
    return
  }
  
  const codedAuth = converStringIntoBase64(loginPassword)
  
  if(auth.slice(6) !== codedAuth) {
    res
      .status(HttpCodes.Unauthorized)
      .json({})
    return
  }

  next()
}
