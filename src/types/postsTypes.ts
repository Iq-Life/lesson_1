export type PostType = {
  id:	string
  title:	string // maxLength: 30
  shortDescription:	string // maxLength: 100
  content:	string // maxLength: 1000
  blogId:	string
  blogName:	string
}

export type CreateUpdatePostType = {
  title:	string
  shortDescription:	string
  content:	string
  blogId:	string
}