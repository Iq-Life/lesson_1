import { ObjectId } from "mongodb"
// TODO: Перенести все DB types в один файл
export type UserDBType = {
  _id:	ObjectId
  login: string
  email: string
  createdAt: string
  passwordHash: string
  passwordSalt: string
}