import { Request, Response } from 'express'
import { ErrorType } from '../../types/errorType';
import { InputPostType, PostType } from '../../types/postsTypes';
import { postService } from '../../domain/postService';
import { HttpCodes } from '../../videos/enums/global-enum';

type ResBodyType = PostType| null | ErrorType

export const createPostController = async (req: Request<any, any, InputPostType>, res: Response<ResBodyType>) => {
  const inputPost = req.body;
  const error = {errorsMessages: []}

  if (error.errorsMessages.length === 0) {
    const createdInfo = await postService.createPost(inputPost)

    if(!createdInfo.id){
      res
      .status(HttpCodes.InternalServerError)
      .json(error)
    } else {
      const newPost = await postService.findPost(createdInfo.id)

      res
        .status(HttpCodes.Created)
        .json(newPost)
    }
  } else {
    res
      .status(HttpCodes.BadRequest)
      .json(error)
  }
}
