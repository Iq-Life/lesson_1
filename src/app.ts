import express, { Request, Response } from 'express'
import { blogCollection, postCollection } from './db/db'
import { SETTINGS } from './settings'
import { postsRouter } from './routes/posts-routes'
import { videosRouter } from './routes/videos-routes'
import { blogsRouter } from './routes/blogs-routers'
import { usersRouter } from './routes/users-routes'

const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello back-end HomeWorks in it-incubator!!!')
})
app.delete('/testing/all-data', async (req: Request, res: Response) => {
    await blogCollection.drop()
    await postCollection.drop()
    res.sendStatus(204)
})
app.use(SETTINGS.PATH.VIDEOS, videosRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)
app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.USERS, usersRouter)

export default app