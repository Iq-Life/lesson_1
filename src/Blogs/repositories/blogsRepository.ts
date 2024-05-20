import { ObjectId } from "mongodb"
import { blogCollection } from "../../db/db"
import { BlogType, InputBlogType } from "../../types/blogsType"
import { BlogDBType } from "../../types/db-types/blogsDBTypes"

export const blogsRepository = {
  async getBlogs(): Promise<BlogType[]> {
    const blogs = await blogCollection.find({}).toArray()
    return blogs.map((blog) => this.mapBlogToOutput(blog))
  },

  async findBlogById(id: string): Promise<BlogType | null> {
    const findedBlog = await blogCollection.findOne({_id: new ObjectId(id)})
    return findedBlog ? this.mapBlogToOutput(findedBlog) : null
  },

  async createBlog(blogData: InputBlogType): Promise<BlogType | null> {
    const newBlog: BlogDBType = {
      _id: new ObjectId(),
      name: blogData.name,
      description: blogData.description,
      websiteUrl: blogData.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership:	false
    }
    const insertedInfo = await blogCollection.insertOne(newBlog)

    if(insertedInfo.insertedId) {
      return this.mapBlogToOutput(newBlog)
    }
    return null
  },

  mapBlogToOutput(blogDb: BlogDBType): BlogType {
    return {
      id: blogDb._id.toString(),
      name: blogDb.name,
      description: blogDb.description,
      websiteUrl: blogDb.websiteUrl,
      createdAt: blogDb.createdAt,
      isMembership:	blogDb.isMembership
    }
  },

  async deleteBlog(id: string): Promise<boolean> {
    const deletedInfo = await blogCollection.deleteOne({_id: new ObjectId(id)})
    return !!deletedInfo.deletedCount
  },

  async updateBlog(id: string, inputBlog: InputBlogType): Promise<boolean> {
    const infoUdated = await blogCollection.updateOne({_id: new ObjectId(id)}, {
      $set: {
        createdAt: new Date().toISOString(),
        ...inputBlog
      }
    })
    return !!infoUdated.modifiedCount 
  }
}