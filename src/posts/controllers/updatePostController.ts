import { Request, Response } from 'express'
import { InputPostType, PostType } from '../../types/postsTypes'
import { postService } from '../domain/postService'

type ParamsType = {
  id: string
}
type ResBodyType = PostType

export const updatePostController = async (req: Request<ParamsType, any, InputPostType>, res: Response<ResBodyType>) => {
  const isUpdatePost = await postService.updatePost(req.params.id, req.body)

  if(isUpdatePost) {
    res
      .sendStatus(204)
  } else {
    res
      .sendStatus(404)
  }
}
