import {DBType} from '../src/db/db'
import { ResolutionsEnum } from '../src/videos/enums/videos-enum'
import { OutputVideoType } from '../src/types/videosTypes';
import { ObjectId } from 'mongodb';
import { PostDBType } from '../src/types/db-types/postsDBTypes';
import { BlogDBType } from '../src/types/db-types/blogsDBTypes';

export const video1= (id?: number, title?: string, canBeDownloaded?: any, minAgeRestriction?: number, publicationDate?: any): OutputVideoType => ({
  id: id ?? (Date.now() + Math.random()),
  title: title ?? ('t' + Date.now() + Math.random()),
  author: 'string',
  canBeDownloaded: canBeDownloaded ?? false,
  minAgeRestriction: minAgeRestriction ?? null,
  createdAt: new Date().toISOString(),
  publicationDate: publicationDate ?? new Date().toISOString(),
  availableResolutions: [ResolutionsEnum.P1440],
})

export const createPosts= (count: number): PostDBType[] => {
  const arrCreatedPosts: PostDBType[] = []
  for (let ind = 0; ind < count; ind++) {
    arrCreatedPosts.push({
      _id: new ObjectId(),
      title: `title${ind+1}`,
      shortDescription:	`shortDescription${ind+1}`,
      content:	`content${ind+1}`,
      blogId:	new ObjectId(),
      blogName:	`blogName${ind+1}`,
      createdAt: new Date().toISOString()
    })
  }
  return arrCreatedPosts
}
export const createBlogs= (count: number): BlogDBType[] => {
  const arrCreatedBlogs: BlogDBType[] = []
  for (let ind = 0; ind < count; ind++) {
    arrCreatedBlogs.push({
      _id: new ObjectId(),
      name: `name${ind+1}`,
      description:	`description${ind+1}`,
      websiteUrl:	`websiteUrl${ind+1}`,
      isMembership:	false,
      createdAt: new Date().toISOString()
    })
  }
  return arrCreatedBlogs
}

export const dataset1: DBType = {
  videos: [video1()],
  posts: [],
  // posts: [createPost()],
  blogs: []
}

export const dataVideoSet2 = (setId: number, title?: string, minAgeRestriction?: number): DBType => {
  const videosData = [video1(), {
    id: setId,
    title: title ?? ('t' + Date.now() + Math.random()),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: minAgeRestriction ?? null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date(),
    availableResolutions: [ResolutionsEnum.P240],
  }]

  return {
    videos: videosData,
    posts: [],
    blogs: []
  }
}