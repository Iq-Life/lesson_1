import { Request, Response } from 'express'
import { db, setDB } from '../../db/db'
import { OutputVideoType } from '../types/videos-types';
import { videoValidator } from '../../validators/validators';
import { TypeRequestEnum } from '../enums/videos-enum';
import { ErrorType } from '../../types/errorType';

type ParamsType = {
  id: string
}
type ResBodyType = OutputVideoType

export const updateVideoController = (req: Request<ParamsType, any, OutputVideoType>, res: Response<ResBodyType | ErrorType>) => {

  const inputVideo = req.body;
  const error = videoValidator(TypeRequestEnum.updateVideo, inputVideo)
  let isUpdateVideo = false

  if (error.errorsMessages.length === 0 && req.params.id) {
    const updatedVideos = db.videos.map((video) => {
      if (video.id === +req.params.id) {
        isUpdateVideo = true
        return {...inputVideo, id: +req.params.id}
      }
      return video
    })
    setDB({videos: updatedVideos})

    if (isUpdateVideo) {
      res
        .sendStatus(204)
    } else {
      res
        .sendStatus(404)
    }
  } else {
    res
      .status(400)
      .json(error)
  }
}
