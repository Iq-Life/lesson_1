import express, { Request, Response } from 'express'
import { setDB } from './db/db'
import { SETTINGS } from './settings'
import { postsRouter } from './routes/posts-routes'
import { videosRouter } from './routes/videos-routes'
import { blogsRouter } from './routes/blogs-routers'
// ? import bodyParser from 'body-parser'

export const app = express()

// ? app.use(bodyParser())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello back-end HomeWorks in it-incubator!!!')
})
app.delete('/testing/all-data', (req: Request, res: Response) => {
    setDB();
    res.sendStatus(204)
})
app.use(SETTINGS.PATH.VIDEOS, videosRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)
app.use(SETTINGS.PATH.BLOGS, blogsRouter)
