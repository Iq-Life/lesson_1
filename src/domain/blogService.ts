import { ObjectId } from "mongodb"
import { blogCollection } from "../db/db"
import { BlogType, InputBlogType, QueryBlogParams } from "../types/blogsType"
import { BlogDBType } from "../types/db-types/blogsDBTypes"
import { blogRepository } from "../Blogs/repositories/blogRepository"
import { ResReqType } from "../types/defaultsTypes"
import { pagesCountFunc } from "../helpers/helpers"


export const blogService = {
  async getBlogs(qeryParam: QueryBlogParams): Promise<ResReqType<BlogType>> {
    const blogs = await blogRepository.getBlogs(qeryParam)
    const countBlogs = await blogRepository.countBlogs(qeryParam)
    const totalCount = await blogRepository.countBlogs()
    const pagesCount = pagesCountFunc(+qeryParam.pageSize, countBlogs)

    return {
      page: +qeryParam.pageNumber,
      pagesCount,
      pageSize: +qeryParam.pageSize,
      totalCount,
      items: blogs.map((blog) => this.mapBlogToOutput(blog))
    }
  },

  async findBlog(blogId: string): Promise<BlogType | null> {
    const blog = await blogRepository.findBlog(blogId) 
    return blog ? this.mapBlogToOutput(blog) : null
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
  }
}