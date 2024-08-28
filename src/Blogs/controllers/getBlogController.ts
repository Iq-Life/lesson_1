import { Request, Response } from 'express'
import { BlogType } from '../../types/blogsType'
import { blogService } from '../../domain/blogService'
import { HttpCodes } from '../../videos/enums/global-enum'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const getBlogController = async (req: Request<ParamsType, any, ReqQueryType>, res: Response<BlogType>) => {  
  const findBlog = await blogService.findBlog(req.params.id)

  if (findBlog) {
    res
      .status(HttpCodes.Success)
      .json(findBlog)
  } else {
    res
      .sendStatus(HttpCodes.NotFound)
  }
}
