export type ResponseAllCharDefaultValue = {
  pageNumber: number
  rowTotalCount: number
  totalPageCount: number
  pageSize: number
  items: charDefaultValueId[]
}

export type charDefaultValueId = {
  id: number
  characteristicId: number
  value: string
  title: string
}

export type ResponseCreateCharDefaultValue = {
  id: number
  characteristicId: number
  value: string
}

export type ResponseUpdateCharDefaultValue = {
  id: number
  characteristicId: number
  value: string
}
