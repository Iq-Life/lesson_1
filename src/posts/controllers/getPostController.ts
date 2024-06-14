import { Request, Response } from 'express'
import { PostType } from '../../types/postsTypes'
import { postRepository } from '../repositories/postRepository'
import { postService } from '../../domain/postService'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const getPostController = async (req: Request<ParamsType, any, ReqQueryType>, res: Response<PostType>) => {
  const findedPost = await postService.findPost(req.params.id)

  if (findedPost) {
    res
      .status(200)
      .json(findedPost)
  } else {
    res
      .sendStatus(404)
  }
}
