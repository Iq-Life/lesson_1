export type ResReqType<I> =  {
  page: number
  pagesCount: number
  pageSize: number
  totalCount: number
  items: I[]
}

export type QueryType= {
  pageNumber: string
  pageSize: string
  sortBy: string
  sortDirection: 'asc' | 'desc'
}

export type PagesTotalCountItemsDb <I> = {
  totalCount: number
  pagesCount: number
  items: I[]
}