import { Router } from "express"
import { getUsersController } from "../users/controllers/getUsersController"
import { createUserController } from "../users/controllers/createUserController"

export const usersRouter = Router()

// usersRouter.get('/', getUsersController)
// usersRouter.get('/:id', getVideoController)
usersRouter.post('/', createUserController)
// usersRouter.delete('/:id', deleteVideoController)