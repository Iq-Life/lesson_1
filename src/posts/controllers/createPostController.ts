import { Request, Response } from 'express'
import { ErrorType } from '../../types/errorType';
import { postRepository } from '../repositories/postRepository';
import { InputPostType, PostType } from '../../types/postsTypes';

type ResBodyType = PostType| null | ErrorType

export const createPostController = async (req: Request<any, any, InputPostType>, res: Response<ResBodyType>) => {
  const inputPost = req.body
  const error = {errorsMessages: []}

  if (error.errorsMessages.length === 0) {
    const createdInfo = await postRepository.createPost(inputPost)

    if(!createdInfo.id){
      res
      .status(500)
      .json(error)
    } else {
      const newPost = await postRepository.findForOutput(createdInfo.id)

      res
        .status(201)
        .json(newPost)
    }
  } else {
    res
      .status(400)
      .json(error)
  }
}
