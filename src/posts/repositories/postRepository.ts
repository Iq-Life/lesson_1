import { ObjectId } from "mongodb"
import { blogCollection, postCollection } from "../../db/db"
import { InputPostType, PostType } from "../../types/postsTypes"
import { PostDBType } from "../../types/db-types/postsDBTypes"

export const postRepository = {
  async findPosts(): Promise<PostDBType[]> {
    return await postCollection.find({}).toArray()
  },
  async findPost(postId: ObjectId): Promise<PostDBType | null> {
    return await postCollection.findOne({_id: postId})
  },

  async getPosts(): Promise<PostType[]> {
    const postsDB = await postCollection.find({}).toArray()
    return postsDB.map((post:PostDBType) => this.mapToOutput(post))
  },

  async findForOutput(postId: string): Promise<PostType | null> {
    const post = await postCollection.findOne({_id: new ObjectId(postId)})
    return  post ? await this.mapToOutput(post) : null
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
      const blog = await blogCollection.findOne({_id: new ObjectId(postData.blogId)})
      const newPost: PostDBType = { 
        ...postData,
        _id: new ObjectId(),
        blogId: new ObjectId(postData.blogId),
        blogName: blog!.name,
        createdAt: new Date().toISOString()
      } 
      const insertedInfo = await postCollection.insertOne(newPost)

      return {id: insertedInfo.insertedId.toString()}
    } catch (error) {
      console.log(error)

      return {error: 'error'}
    }

  },

  async deletePost(id: string): Promise<boolean> {
    const deletedInfo = await postCollection.deleteOne({_id: new ObjectId(id)})
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