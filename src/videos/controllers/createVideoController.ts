import { Request, Response } from 'express'
import { ErrorType } from '../../types/errorType';
import { videoValidator } from '../../validators/video-validator';
import { TypeRequestEnum } from '../enums/videos-enum';
import { videoRepository } from '../repositories/videoRepository';
import { InputForCreateVideoType, OutputVideoType } from '../../types/videosTypes';
import { HttpCodes } from '../enums/global-enum';

type ResBodyType = OutputVideoType | ErrorType

export const createVideoController = (req: Request<any, any, InputForCreateVideoType>, res: Response<ResBodyType>) => {
  const inputVideo = req.body;
  const error = videoValidator(TypeRequestEnum.createVideo, inputVideo)

  if (error.errorsMessages.length === 0) {
    const newVideo = videoRepository.createVideos(inputVideo)
    res
      .status(HttpCodes.Created)
      .json(newVideo)
  } else {
    res
      .status(HttpCodes.BadRequest)
      .json(error)
  }
}
