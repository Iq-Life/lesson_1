import { Router } from "express"
import { getUsersController } from "../users/controllers/getUsersController"

export const usersRouter = Router()

usersRouter.get('/', getUsersController)
// usersRouter.get('/:id', getVideoController)
// usersRouter.post('/', createVideoController)
// usersRouter.delete('/:id', deleteVideoController)