import { Router } from "express"
import { getBlogsController } from "../Blogs/controllers/getBlogsController"
import { getBlogController } from "../Blogs/controllers/getBlogController"
import { createBlogController } from "../Blogs/controllers/createBlogController"
import { check } from "express-validator"
import { idValid, lengthValid, urlValid } from "../middlewares/validators"
import { errorsValidation } from "../middlewares/errors-validation"
import { deleteBlogController } from "../Blogs/controllers/deleteBlogController"
import { updateBlogController } from "../Blogs/controllers/updateBlogController"
import { authMiddleware } from "../middlewares/authValidation"

export const blogsRouter = Router()

blogsRouter.get('/', getBlogsController)
blogsRouter.get('/:id', idValid, getBlogController)
blogsRouter.delete(
  '/:id',
  authMiddleware,
  idValid,
  deleteBlogController
)
blogsRouter.post(
  '/',
  authMiddleware,
  check(['name', 'description', 'websiteUrl']),
  lengthValid({ title: 'name', max: 15 }),
  lengthValid({ title: 'description', max: 500 }),
  lengthValid({ title: 'websiteUrl', max: 100 }),
  urlValid('websiteUrl'),
  errorsValidation,
  createBlogController)
blogsRouter.put(
  '/:id',
  authMiddleware,
  idValid,
  check(['name', 'description', 'websiteUrl']),
  lengthValid({ title: 'name', max: 15 }),
  lengthValid({ title: 'description', max: 500 }),
  lengthValid({ title: 'websiteUrl', max: 100 }),
  urlValid('websiteUrl'),
  errorsValidation,
  updateBlogController
)