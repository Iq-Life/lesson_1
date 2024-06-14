import { QueryType } from "./defaultsTypes"

export type BlogType = {
  id: string
  name: string
  description: string
  websiteUrl: string
  createdAt: string
  isMembership: boolean
}

export type InputBlogType = {
  name: string
  description: string
  websiteUrl: string
}

export interface  QueryBlogParams extends QueryType {
  searchNameTerm: string;
}