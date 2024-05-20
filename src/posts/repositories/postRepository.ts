import { ObjectId } from "mongodb"
import { postCollection } from "../../db/db"
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
    return postsDB.map((post) => this.mapToOutput(post))
  },

  async findForOutput(postId: string): Promise<PostType | null> {
    const post = await postCollection.findOne({_id: new ObjectId(postId)})
    return post ? this.mapToOutput(post) as PostType : null
  },

  mapToOutput (post: PostDBType): PostType {
    return {
      id: post._id.toString(),
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId.toString(),
      blogName: post.blogName,
      createdAt: new Date().toISOString()
    }
  },

  async createPost(postData: InputPostType): Promise<{error?: string, id?: string}> {
    // ? что лучше возввращать в таких случаях
    const newPost = { ...postData } as any

    try {
      const insertedInfo = await postCollection.insertOne(newPost)

      return {id: insertedInfo.insertedId.toString()}
    } catch (error) {
      console.log(error)

      return {error: 'error'}
    }

  },

  async deletePost(id: string): Promise<{error?: string, isDeleted: boolean}> {
    try {
      await postCollection.deleteOne({_id: new ObjectId(id)})
  
      return { isDeleted: true }
    } catch (error) {
      // ? какие ошибки лучше выводить
      console.log(error)

      return {error: 'problem to delete', isDeleted: false}
    }
  },

  async updatePost(id: string, inputPost: InputPostType): Promise<{error?: string, isUpdate: boolean}> {
    try {
      // ? what fuck зачем приходится проводить такие манипуляцйии
      const changedPost = { ...inputPost } as any
      const insertedInfo = await postCollection.updateOne({
        _id: new ObjectId(id)},
        { $set: changedPost }
      )

      return { isUpdate: !!insertedInfo.modifiedCount }
    } catch {
      console.log(new Error('problem to update'));

      return {error: 'problem to update', isUpdate: false}
    }
  }
}