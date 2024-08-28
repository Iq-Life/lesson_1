import { Request, Response } from 'express'
import { InputForUpdateVideoType, OutputVideoType } from '../../types/videosTypes';
import { videoValidator } from '../../validators/video-validator';
import { TypeRequestEnum } from '../enums/videos-enum';
import { ErrorType } from '../../types/errorType';
import { videoRepository } from '../repositories/videoRepository';
import { HttpCodes } from '../enums/global-enum';

type ParamsType = {
  id: string
}
type ResBodyType = OutputVideoType

export const updateVideoController = (req: Request<ParamsType, any, InputForUpdateVideoType>, res: Response<ResBodyType | ErrorType>) => {
  const inputVideo = req.body;
  const error = videoValidator(TypeRequestEnum.updateVideo, inputVideo)

  if (error.errorsMessages.length === 0 && req.params.id) {
    const isUpdateVideo = videoRepository.updateVideo(+req.params.id, inputVideo)

    if (isUpdateVideo) {
      res
        .sendStatus(HttpCodes.NoContent)
    } else {
      res
        .sendStatus(HttpCodes.NotFound)
    }
  } else {
    res
      .status(HttpCodes.BadRequest)
      .json(error)
  }
}
