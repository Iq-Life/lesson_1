import { ValidationChain, body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { blogRepository } from "../Blogs/repositories/blogRepository";
import { blogCollection } from "../db/db";

type LengthValidType = {
  title: string,
  min?: number,
  max?: number,
}

type ParamsType = {
  id: string
}

export const lengthValid = ({title, min, max}: LengthValidType): ValidationChain => (
  body(title)
    .trim()
    .notEmpty()
    .isLength({ max, min })
    .withMessage((min ? `min length is ${min} letters` : '') + (max ? `max length is ${max} letters` : ''))
)

export const urlValid = (field: string): ValidationChain => (
  body(field)
    .trim()
    .matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
    .withMessage(('Invalid url'))
)

export const idValid = (req: Request<ParamsType>, res: Response, next: NextFunction) => {
  if(!ObjectId.isValid(req.params.id)) {
    res
      .sendStatus(404)
    return
  }
  next()
}


export const forBlogId = (field: string): ValidationChain => {
  return body(field)
    .custom( async (value) => {
      if (typeof value !== 'string') {
        throw new Error(field + ' must be string');
      }
      const findBlogById = await blogRepository.findBlog(value)
      if (!findBlogById) {
        throw new Error(field + ' not found');
      }
    })
}
