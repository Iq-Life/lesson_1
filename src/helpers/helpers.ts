import { QueryType } from "../types/defaultsTypes"

export const converStringIntoBase64 = (obj: any) => {
  return Buffer.from(obj, 'utf8').toString('base64')
}

export const converBase64IntoString = (text: string) => {
  return Buffer.from(text, 'utf8').toString('base64')
}

export const skipFunc = (queryParam : QueryType) => {
  return +queryParam.pageSize *(+queryParam.pageNumber - 1)
}

export const pagesCount = (queryParam : QueryType) => {
  return Math.ceil(+queryParam.pageSize / +queryParam.pageSize)
}

  // const decodedAuth = buff.toString('utf8')
  
  // const buff2 = Buffer.from(loginPassword, 'utf8')
  // const codedAuth = buff2.toString('base64')