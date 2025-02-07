// Определение типа для отдельной характеристики
interface Characteristic {
  id: number
  title: string
  description: string | null
  isVisible: boolean
}

// Определение типа для всего ответа
export interface CharacteristicsResponse {
  pageNumber: number
  rowTotalCount: number
  totalPageCount: number
  pageSize: number
  items: Characteristic[]
}
