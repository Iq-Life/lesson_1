import { DeleteResult, InsertOneResult, ObjectId, WithId } from "mongodb"
import { blogCollection, postCollection } from "../../db/db"
import { InputPostType, PostType } from "../../types/postsTypes"
import { PostDBType } from "../../types/db-types/postsDBTypes"
import { QueryType, ResReqType } from "../../types/defaultsTypes"
import { pagesCountFunc, skipFunc, sortFunc } from "../../helpers/helpers"

export const postRepository = {
  async postTotalCount (): Promise<number> {
    return postCollection.countDocuments()
  },
  async findPost(postId: string): Promise<PostDBType | null> {
    return await postCollection.findOne({_id: new ObjectId(postId)})
  },
  async getPosts(query: QueryType): Promise<PostDBType[]>{
    const postsDb = await postCollection.find({})
    .sort(sortFunc(query.sortBy, query.sortDirection))
    .skip(skipFunc(+query.pageSize, +query.pageNumber))
    .limit(+query.pageSize)
    .toArray()

    return postsDb
  },

  async findForOutput(postId: string): Promise<WithId<PostDBType> | null> {
    return  postCollection.findOne({_id: new ObjectId(postId)})
  },

  async createPost(newPost: PostDBType): Promise<InsertOneResult<PostDBType>> {
    return await postCollection.insertOne(newPost)
  },

  async deletePost(id: string): Promise<DeleteResult> {
    return postCollection.deleteOne({_id: new ObjectId(id)})
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