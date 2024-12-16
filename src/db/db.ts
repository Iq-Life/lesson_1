import { BlogType } from "../types/blogsType"
import { PostType } from "../types/postsTypes"
import { OutputVideoType } from "../types/videosTypes"
import { Collection, Db, MongoClient, ObjectId, ServerApiVersion  } from "mongodb"
import * as dotenv from 'dotenv'
import { BlogDBType } from "../types/db-types/blogsDBTypes"
import { PostDBType } from "../types/db-types/postsDBTypes"
import { UserDBType } from "../types/db-types/userDBTypes"
import { UserType } from "../types/userType"

dotenv.config()
export const loginPassword = 'admin:qwerty'

export type DBType = {
  videos: OutputVideoType[]
  posts: PostType[]
  blogs: BlogType[]
  users: UserType[]
}

export const dbLocal: DBType = {
  videos: [],
  posts: [],
  blogs: [],
  users: []
}

export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) {
    dbLocal.videos = []
    dbLocal.posts = []
    dbLocal.blogs = []
    dbLocal.users = []
  } else {
    dbLocal.videos = dataset.videos || dbLocal.videos
    dbLocal.posts = dataset.posts || dbLocal.posts
    dbLocal.blogs = dataset.blogs || dbLocal.blogs
    dbLocal.users = dataset.users || dbLocal.users
  }
}
////!
const mongoURL = process.env.MONGO_URL
const postCollectionName = process.env.POST_COLLECTION_NAME || 'mongodb://0.0.0.0:27017'
const blogCollectionName = process.env.BLOG_COLLECTION_NAME || 'mongodb://0.0.0.0:27017'
const usersCollectionName = process.env.USERS_COLLECTION_NAME || 'mongodb://0.0.0.0:27017'
let client: MongoClient = {} as MongoClient
export let db: Db = {} as Db

export let postCollection: Collection<PostDBType> = {} as Collection<PostDBType>
export let blogCollection: Collection<BlogDBType> = {} as Collection<BlogDBType>
export let usersCollection: Collection<UserDBType> = {} as Collection<UserDBType>

export const runDB = async () => {
  if (!mongoURL) {
    return new Error("! Url doesn't found")
  }
  try {
    client = new MongoClient(mongoURL)
    db = client.db(process.env.DB_NAME)
    
    postCollection = db.collection<PostDBType>(postCollectionName)
    blogCollection = db.collection<BlogDBType>(blogCollectionName)
    usersCollection = db.collection<UserDBType>(usersCollectionName)

    await client.connect()
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
    return true
  } catch (e) {
    // Ensures that the client will close when you finish/error
    console.log(e)
    await client.close()
    return false
  }
}