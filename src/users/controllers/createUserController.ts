
import { Request, Response } from 'express'
import { InputUserType, UserType } from '../../types/userType'
import { ErrorType } from '../../types/errorType'
import { userService } from '../services/createUserService'

export const createUserController = async (req: Request<any, any, InputUserType>, res: Response<UserType | ErrorType>) => {
  console.log(' req === > ', req.body)
  const error = {errorsMessages: []}
  const createdUser = await userService.createUser(req.body.login, req.body.email, req.body.password)

  console.log(' === > ', createdUser && error.errorsMessages.length === 0, createdUser)
  if(createdUser && error.errorsMessages.length === 0) {
    res.status(201).send(createdUser)
  } else {
    res.status(400).send(error)
  }
}