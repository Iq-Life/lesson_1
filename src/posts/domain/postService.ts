import { ObjectId } from "mongodb"
import { blogCollection, postCollection } from "../../db/db"
import { PostDBType } from "../../types/db-types/postsDBTypes"
import { InputPostType, PostType } from "../../types/postsTypes"
import { QueryType, ResReqType } from "../../types/defaultsTypes"
import { postRepository } from "../repositories/postRepository"
import { blogsRepository } from "../../Blogs/repositories/blogsRepository"
import { pagesCountFunc } from "../../helpers/helpers"


export const postService = {
  // async findPosts(param: QueryType): Promise<ResReqType<PostType>> {
  //   const res = await postRepository.findPosts(param)
  //   return {
  //     ...res,
  //     items: res.items.map((postDb) => this.mapToOutput(postDb))
  //   }
  // },
  // async findPost(postId: ObjectId): Promise<PostDBType | null> {
  //   return await postCollection.findOne({_id: postId})
  // },

  async getPosts(query: QueryType): Promise<ResReqType<PostType>> {
    const totalCount = await postRepository.postTotalCount()
    const postsDb = await postRepository.getPosts(query)
    const pagesCount = pagesCountFunc(+query.pageSize, totalCount)

    return {
      page: +query.pageNumber,
      pageSize: +query.pageSize,
      pagesCount,
      totalCount,
      items: postsDb.map((post) => this.mapToOutput(post))
    }
  },

  async findPost(postId: string): Promise<PostType | null> {
    const post = await postRepository.findPost(postId)
    return  post ? this.mapToOutput(post) : null
  },

  mapToOutput (post: PostDBType): PostType {
    return {
      id: post._id.toString(),
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId.toString(),
      blogName: post.blogName,
      createdAt: post.createdAt
    }
  },

  async createPost(postData: InputPostType): Promise<{error?: string, id?: string}> {
    try {
      const blog = await blogsRepository.findBlogById(postData.blogId)
      const newPost: PostDBType = { 
        ...postData,
        _id: new ObjectId(),
        blogId: new ObjectId(postData.blogId),
        blogName: blog!.name,
        createdAt: new Date().toISOString()
      } 
      const insertedInfo = await postRepository.createPost(newPost)

      return {id: insertedInfo.insertedId.toString()}
    } catch (error) {
      console.log(error)

      return {error: 'error'}
    }

  },

  async deletePost(id: string): Promise<boolean> {
    const deletedInfo = await postRepository.deletePost(id)
    return !!deletedInfo.deletedCount
  },

  async updatePost(id: string, inputPost: InputPostType): Promise<boolean> {
    const changedPost = { 
      ...inputPost,
      blogId: new ObjectId(inputPost.blogId)
    } 
    const insertedInfo = await postCollection.updateOne({
      _id: new ObjectId(id)},
      { $set: changedPost }
    )
    return !!insertedInfo.modifiedCount
  }
}