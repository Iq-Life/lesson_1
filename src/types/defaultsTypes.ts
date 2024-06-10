export type ResReqType<I> =  {
  page: number
  pagesCount: number
  pageSize: number
  totalCount: number
  items: I[]
}

export type SortDirectionType = 'asc' | 'desc'
export type QueryType= {
  pageNumber: string
  pageSize: string
  sortBy: string
  sortDirection: SortDirectionType
}

export type PagesTotalCountItemsDb <I> = {
  totalCount: number
  pagesCount: number
  items: I[]
}
