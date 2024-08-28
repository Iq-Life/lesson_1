import { Request, Response } from 'express'
import { blogRepository } from '../repositories/blogRepository'
import { HttpCodes } from '../../videos/enums/global-enum'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const deleteBlogController = async (req: Request<ParamsType, any, ReqQueryType>, res: Response) => {
  const isDeleted = await blogRepository.deleteBlog(req.params.id);

  if (isDeleted) {
    res
      .sendStatus(HttpCodes.NoContent)
  } else {
    res
      .sendStatus(HttpCodes.NotFound)
  }
}
