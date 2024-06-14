import { Request, Response } from 'express'
import { blogRepository } from '../repositories/blogRepository'
import { BlogType } from '../../types/blogsType'
import { blogService } from '../../domain/blogService'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const getBlogController = async (req: Request<ParamsType, any, ReqQueryType>, res: Response<BlogType>) => {  
  const findBlog = await blogService.findBlog(req.params.id)

  if (findBlog) {
    res
      .status(200)
      .json(findBlog)
  } else {
    res
      .sendStatus(404)
  }
}
