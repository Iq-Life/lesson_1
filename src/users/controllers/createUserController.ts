import { Request, Response } from 'express'
import { InputUserType, UserType } from '../../types/userType'
import { createUserService } from '../services/createUserService'

export const createUserController = async (req: Request<any, any, InputUserType>, res: Response<UserType>) => {
const createdUser = await createUserService(req.body)
}