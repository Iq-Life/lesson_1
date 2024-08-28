import { Request, Response } from 'express'
import { dbLocal } from '../../db/db'
import { OutputVideoType } from '../../types/videosTypes'
import { HttpCodes } from '../enums/global-enum'

export const getVideosController = (req: Request, res: Response<OutputVideoType[]>) => {
  res
    .status(HttpCodes.Success)
    .json(dbLocal.videos)
}