import { InsertOneResult, ObjectId } from "mongodb"
import { blogCollection } from "../../db/db"
import { BlogType, InputBlogType, QueryBlogParams } from "../../types/blogsType"
import { BlogDBType } from "../../types/db-types/blogsDBTypes"
import { searchFunc } from "../../helpers/helpers"

export const blogRepository = {
  getBlogs(qeryParam: QueryBlogParams): Promise<BlogDBType[]> {
    return blogCollection.find(searchFunc('name', qeryParam.searchNameTerm)).toArray()
  },
  countBlogs (qeryParam?: QueryBlogParams): Promise<number>{
    return blogCollection.countDocuments(searchFunc('name', qeryParam?.searchNameTerm))
  },
  findBlog(id: string): Promise<BlogDBType | null> {
    return blogCollection.findOne({_id: new ObjectId(id)})
  },

  createBlog(newBlog: BlogDBType): Promise<InsertOneResult<BlogDBType>> {
    return blogCollection.insertOne(newBlog)
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