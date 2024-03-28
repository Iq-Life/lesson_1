import { Request, Response } from 'express'
import { db, setDB } from '../../db/db'
import { InputForUpdateVideoType, OutputVideoType } from '../types/videos-types';
import { ErrorType } from '../../types/errorType';
import { videoValidator } from '../../validators/validators';
import { TypeRequestEnum } from '../enums/videos-enum';

type ParamsType = {
  id: string
}
type ResBodyType = OutputVideoType

export const updateVideoController = (req: Request<ParamsType, any, OutputVideoType>, res: Response<any>) => {

  const inputVideo = req.body;
  const isRequerFields = !!(inputVideo.availableResolutions && inputVideo.title && inputVideo.author && inputVideo.minAgeRestriction && inputVideo.publicationDate && inputVideo.canBeDownloaded)
  let isUpdateVideo = false
  console.log('isRequerFields', isRequerFields, req.params.id);

  if (isRequerFields && req.params.id) {
    setDB({
      videos: db.videos.map((video) => {
        if (video.id === +req.params.id) {
          isUpdateVideo = true
          return inputVideo
        }
        return video
      })
    })
    if (isUpdateVideo) {
      console.log('return', inputVideo)
      res
        .status(204)
        .json(inputVideo)
    } else {
      res
        .sendStatus(404)
    }
  } else {
    res
      .status(400)
      .json(videoValidator(TypeRequestEnum.updateVideo, inputVideo))
  }
}
