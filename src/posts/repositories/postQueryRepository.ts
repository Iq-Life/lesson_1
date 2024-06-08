import { ObjectId } from "mongodb"
import { blogCollection, postCollection } from "../../db/db"
import { InputPostType, PostType } from "../../types/postsTypes"
import { PostDBType } from "../../types/db-types/postsDBTypes"
import { BlogDBType } from "../../types/db-types/blogsDBTypes"

export const postQueryRepository = {
  mapToOutput (post: BlogDBType): any {
    return {
      id: post._id,
      // title: post.name
    }
  },
  async getMany (query: any, blogId: string) {
    const byId = blogId ? { blogId: new ObjectId(blogId) } : {}
    const search = query.searchNameTerm
      ? { title: { $regex: query.searchNameTerm, $options: 'i' } }
      : {}
    const filter = {
      //
    }

    try {
      const items = await postCollection
        .find(filter)
        .skip((query.pageNumber -1) * query.pageSize)
        .limit(query.pageSize)
        .toArray()
      const totalCount = await postCollection.countDocuments(filter)

      return {
        pageCount: Math.ceil(totalCount / query.pageSize),
        page: query.pageNumber,
        pageSize: query.pageSize,
        totalCount,
        // items: items.map(this.mapToOutput)
      } 
    } catch (err) {
      console.log(err)

      return {}
    }
  }
}