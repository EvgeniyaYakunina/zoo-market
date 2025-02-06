export type nodeType = {
  id: number
  type: string
  description: null | string
}

export type ResponseGetAllNodeTypes = {
  pageNumber: number
  rowTotalCount: number
  totalPageCount: number
  pageSize: number
  items: nodeType[]
}
