import { Request, Response } from 'express'
import { OutputVideoType } from '../../types/videosTypes'
import { postService } from '../../domain/postService'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const deletePostController = async (req: Request<ParamsType, any, ReqQueryType>, res: Response<OutputVideoType>) => {
  const isDeleted = await postService.deletePost(req.params.id);

  if (isDeleted) {
    res
      .sendStatus(204)
  } else {
    res
      .sendStatus(404)
  }
}
