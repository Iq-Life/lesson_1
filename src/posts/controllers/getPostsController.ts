import { Request, Response } from 'express'
import { PostType } from '../../types/postsTypes'
import { QueryType, ResReqType } from '../../types/defaultsTypes'
import { postService } from '../../domain/postService'

export const getPostsController = async (req: Request<any, any, any, QueryType>, res: Response<ResReqType<PostType>>) => {
  const posts = await postService.getPosts(req.query)
  res
    .status(200)
    .json(posts)
}