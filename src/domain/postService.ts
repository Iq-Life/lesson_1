import { ObjectId } from "mongodb"
import { PostDBType } from "../types/db-types/postsDBTypes"
import { InputPostType, PostType } from "../types/postsTypes"
import { QueryType, ResReqType } from "../types/defaultsTypes"
import { postRepository } from "../posts/repositories/postRepository"
import { blogRepository } from "../Blogs/repositories/blogRepository"
import { pagesCountFunc } from "../helpers/helpers"


export const postService = {
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

  async createPost(postData: InputPostType): Promise<{error?: string, id?: string}> {
    try {
      const blog = await blogRepository.findBlog(postData.blogId)
      // ? Куда вынести ObjectId service или repasitory
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
    const insertedInfo = await postRepository.updatePost(id, inputPost)
    return !!insertedInfo.modifiedCount
  }
}