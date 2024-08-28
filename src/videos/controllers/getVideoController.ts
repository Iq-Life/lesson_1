import { Request, Response } from 'express'
import { videoRepository } from '../repositories/videoRepository'
import { OutputVideoType } from '../../types/videosTypes'
import { HttpCodes } from '../enums/global-enum'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const getVideoController = (req: Request<ParamsType, any, ReqQueryType>, res: Response<OutputVideoType>) => {
  const findVideo = videoRepository.findVideoById(+req.params.id)

  if (findVideo) {
    res
      .status(HttpCodes.Success)
      .json(findVideo)
  } else {
    res
      .sendStatus(HttpCodes.NotFound)
  }
}
