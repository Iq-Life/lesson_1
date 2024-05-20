import { Request, Response } from 'express'
import { InputPostType, PostType } from '../../types/postsTypes'
import { postRepository } from '../repositories/postRepository'

type ParamsType = {
  id: string
}
type ResBodyType = PostType

export const updatePostController = async (req: Request<ParamsType, any, InputPostType>, res: Response<ResBodyType>) => {
  const isUpdatePost = await postRepository.updatePost(req.params.id, req.body)

  if(isUpdatePost) {
    res
      .sendStatus(204)
  } else {
    res
      .sendStatus(404)
  }
}
