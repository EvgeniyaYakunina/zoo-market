export type characteristic = {
  id: number
  title: string
  description: string
  isVisible: boolean
}

export type characteristics = {
  pageNumber: number
  rowTotalCount: number
  totalPageCount: number
  pageSize: number
  items: characteristic[]
}
