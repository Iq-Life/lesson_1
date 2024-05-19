import { ObjectId } from "mongodb"

export type PostDBType = {
  _id:	ObjectId
  title:	string // maxLength: 30
  shortDescription:	string // maxLength: 100
  content:	string // maxLength: 1000
  blogId:	ObjectId
  blogName:	string
  createdAt: Date
}