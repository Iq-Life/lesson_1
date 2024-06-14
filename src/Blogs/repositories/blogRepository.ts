import { ObjectId } from "mongodb"
import { blogCollection } from "../../db/db"
import { BlogType, InputBlogType, QueryBlogParams } from "../../types/blogsType"
import { BlogDBType } from "../../types/db-types/blogsDBTypes"
import { searchFunc } from "../../helpers/helpers"

export const blogRepository = {
  async getBlogs(qeryParam: QueryBlogParams): Promise<BlogDBType[]> {
    return await blogCollection.find(searchFunc('name', qeryParam.searchNameTerm)).toArray()
  },
  async countBlogs (qeryParam?: QueryBlogParams): Promise<number>{
    return blogCollection.countDocuments(searchFunc('name', qeryParam?.searchNameTerm))
  },
  async findBlog(id: string): Promise<BlogDBType | null> {
    return await blogCollection.findOne({_id: new ObjectId(id)})
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
        ...inputBlog
      }
    })
    return !!infoUdated.modifiedCount 
  }
}