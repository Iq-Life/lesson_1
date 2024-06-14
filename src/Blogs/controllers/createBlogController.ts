import { Request, Response } from 'express'
import { ErrorType } from '../../types/errorType';
import { BlogType, InputBlogType } from '../../types/blogsType';
import { blogRepository } from '../repositories/blogRepository';

type ResBodyType = BlogType | ErrorType

export const createBlogController = async (req: Request<any, any, InputBlogType>, res: Response<ResBodyType>) => {
  const newBlog = await blogRepository.createBlog(req.body)

  if (newBlog) {
    res
      .status(201)
      .json(newBlog)
    } else {
    res
      .sendStatus(500)
  }
}
