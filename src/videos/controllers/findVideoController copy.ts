import { Request, Response } from 'express'
import { db } from '../../db/db'
import { OutputVideoType } from '../types/videos-types'

type ParamsType = {
  id: string
}

type ReqQueryType = string //? строка ?

export const findVideoController = (req: Request<ParamsType, any, ReqQueryType>, res: Response<OutputVideoType>) => {
  if (req.params.id) {
    const findVideoById = db.videos.find((video) => video.id === +req.params.id)
    if (findVideoById) {
      res
        .status(200)
        .json(findVideoById)
    } else {
      res
        .sendStatus(404)
    }
  } else {
    res
      .sendStatus(400)
  }
}
