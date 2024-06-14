import { Request, Response } from 'express'
import { BlogType, InputBlogType } from '../../types/blogsType'

type ParamsType = {
  id: string
}
type ResBodyType = BlogType

export const updateBlogController = async (req: Request<ParamsType, any, InputBlogType>, res: Response<ResBodyType>) => {
  // const isUpdateBlog = await blogRepository.updateBlog(req.params.id, req.body)
  // if(isUpdateBlog) {
  //   res
  //     .sendStatus(204)
  // } else {
  //   res
  //     .sendStatus(404)
  // }
}
