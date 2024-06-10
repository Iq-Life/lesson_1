import { QueryType, SortDirectionType } from "../types/defaultsTypes"

export const converStringIntoBase64 = (obj: any) => {
  return Buffer.from(obj, 'utf8').toString('base64')
}

export const converBase64IntoString = (text: string) => {
  return Buffer.from(text, 'utf8').toString('base64')
}

export const skipFunc = (pageSize: number, pageNumber: number): number => {
  return pageSize * (pageNumber - 1)
}

export const pagesCountFunc = (pageSize: number, totalCount: number): number => {
  return Math.ceil(totalCount / pageSize)
}

export const sortFunc = (sortBy: string, sortDirection: SortDirectionType) => {
  const sorted: any = {}
  if (sortBy) {
    sorted[sortBy] = sortDirection === 'asc' ? 1 : -1
  }

  return sorted
}
  // const decodedAuth = buff.toString('utf8')
  
  // const buff2 = Buffer.from(loginPassword, 'utf8')
  // const codedAuth = buff2.toString('base64')