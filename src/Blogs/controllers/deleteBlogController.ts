import { Request, Response } from 'express'
import { blogRepository } from '../repositories/blogRepository'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const deleteBlogController = async (req: Request<ParamsType, any, ReqQueryType>, res: Response) => {
  const isDeleted = await blogRepository.deleteBlog(req.params.id);

  if (isDeleted) {
    res
      .sendStatus(204)
  } else {
    res
      .sendStatus(404)
  }
}
