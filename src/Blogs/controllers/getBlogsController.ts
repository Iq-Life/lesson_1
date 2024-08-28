import { Request, Response } from 'express'
import { BlogType, QueryBlogParams } from '../../types/blogsType'
import { blogService } from '../../domain/blogService'
import { ResReqType } from '../../types/defaultsTypes'
import { HttpCodes } from '../../videos/enums/global-enum'

export const getBlogsController = async (req: Request<any, any, any, QueryBlogParams>, res: Response<ResReqType<BlogType>>) => {
  const blogs = await blogService.getBlogs(req.query)

  res
    .status(HttpCodes.Success)
    .json(blogs)
}