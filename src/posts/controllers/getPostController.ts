import { Request, Response } from 'express'
import { PostType } from '../../types/postsTypes'
import { postRepository } from '../repositories/postRepository'
import { postService } from '../../domain/postService'
import { HttpCodes } from '../../videos/enums/global-enum'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const getPostController = async (req: Request<ParamsType, any, ReqQueryType>, res: Response<PostType>) => {
  const findedPost = await postService.findPost(req.params.id)

  if (findedPost) {
    res
      .status(HttpCodes.Success)
      .json(findedPost)
  } else {
    res
      .sendStatus(HttpCodes.NotFound)
  }
}
