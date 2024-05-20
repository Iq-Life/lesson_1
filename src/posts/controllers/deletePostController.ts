import { Request, Response } from 'express'
import { OutputVideoType } from '../../types/videosTypes'
import { postRepository } from '../repositories/postRepository'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const deletePostController = async (req: Request<ParamsType, any, ReqQueryType>, res: Response<OutputVideoType>) => {
  const isDeleted = await postRepository.deletePost(req.params.id);

  if (isDeleted) {
    res
      .sendStatus(204)
  } else {
    res
      .sendStatus(404)
  }
}
