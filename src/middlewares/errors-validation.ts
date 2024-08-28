import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HttpCodes } from "../videos/enums/global-enum";

type ExErrType = {
  type: string,
  value: string,
  msg: string,
  path: string,
  location: string
}

const errorParser = (errorExpress: ExErrType[]) => ({
  errorsMessages: errorExpress.map((exErr) => ({
    field: exErr.path,
    message: exErr.msg
  }))
})

export const errorsValidation = (req: Request, res: Response, next: NextFunction) => {
  const expressErrors = validationResult(req).array({ onlyFirstError: true }) as ExErrType[]
  
  if (expressErrors.length) {
    const error = errorParser(expressErrors)
    res.status(HttpCodes.BadRequest).json(error)
  } else {
    next()
  }
}