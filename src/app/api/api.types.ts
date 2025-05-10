//types for characteristics

export type Optional<T> = T | null | undefined
export type PromiseOptional<T> = Promise<T | null | undefined>
export type PromiseNull<T> = Promise<T | null>
export type Nullable<T> = T | null

// Определение типа для отдельной характеристики
export type Characteristic = {
  id: number
  title: string
  description: Nullable<string>
  isVisible: boolean
}

// Определение типа для всего ответа
export type CharacteristicsResponse = {
  pageNumber: number
  rowTotalCount: number
  totalPageCount: number
  pageSize: number
  items: Characteristic[]
}

// Тип для запроса создания характеристики
export type CreateCharacteristicRequest = {
  title: string
  description: Nullable<string>
}

// Тип для запроса обновления характеристики

export type UpdateCharacteristicRequest = {
  id: number
  title: string
  description: Nullable<string>
  isVisible: boolean
}
export type UpdateCharacteristicResponse = {
  id: number
  characteristicId: number
  value: string
}

// Определение типа для отдельного фильтра
type Filter = {
  characteristicId: number
  title: string
  values: string[]
}

// Определение типа для всего ответа
export type AllFiltersResponse = Filter[]

//types for char_default_value

// Тип для отдельного элемента характеристики
export type CharacteristicDefaultValue = {
  id: number
  characteristicId: number
  value: string
  title: string
}

// Тип для ответа с пагинацией
export type CharacteristicDefaultValuesResponse = {
  pageNumber: number
  rowTotalCount: number
  totalPageCount: number
  pageSize: number
  items: CharacteristicDefaultValue[]
}

//types for node_type

// Тип для отдельного типа узла
export type NodeType = {
  id: number
  type: string
  description: Nullable<string>
}

// Тип для ответа с пагинацией
export type NodeTypesResponse = {
  pageNumber: number
  rowTotalCount: number
  totalPageCount: number
  pageSize: number
  items: NodeType[]
}

//types for node

// type для отдельного узла
export type Node = {
  id: number
  title: string
  nodeTypeId: number
  description: Nullable<string>
  createdAt: string
  updatedAt: string
  removedAt: Nullable<string>
}

// type для ответа с пагинацией
export type NodesResponse = {
  pageNumber: number
  rowTotalCount: number
  totalPageCount: number
  pageSize: number
  items: Node[]
}

// types for cards

// Тип для тела запроса
export type CreateCardRequest = {
  title: string
  nodeDescription: Nullable<string>
  nodeTypeId: number
  images: string[]
  characteristics: Array<{
    id: number
    value: string
    additionalParams: Record<string, unknown> | null
  }>
}

// Тип для характеристики в ответе
export type CharacteristicResponse = {
  title: string
  value: string
  additionalParams: Record<string, unknown> | null
  description: Nullable<string>
}

// Тип для ответа
export type CreateCardResponse = {
  id: {
    nodeId: number
    title: string
    nodeDescription: Nullable<string>
    createdAt: string
    updatedAt: string
    removedAt: Nullable<string>
    images: string[]
    nodeType: string
    nodeTypeDescription: Nullable<string>
    characteristics: CharacteristicResponse[][]
  }
}
// for get card by id
export type CardDetails = {
  nodeId: number
  title: string
  nodeDescription: Nullable<string>
  createdAt: string
  updatedAt: string
  removedAt: Nullable<string>

  // Добавляем цены
  priceByn: number | null
  priceRub: number | null

  images: string[]
  nodeType: string
  nodeTypeDescription: Nullable<string>
  characteristics: CharacteristicResponse[][]
  sale: number | null
}

// Новый тип для отдельной карточки в ответе getAllCards
export type CardItem = Omit<Node, 'id' | 'nodeTypeId' | 'description'> & {
  nodeId: number
  nodeDescription: Nullable<string>
  images: string[]
  nodeType: string
  nodeTypeDescription: Nullable<string>
  characteristics: CharacteristicResponse[][]
  priceByn: number | null
  priceRub: number | null
  sale: number | null
}

// Новый тип для ответа getAllCards
export type AllCardsResponse = {
  pageNumber: number
  rowTotalCount: number
  totalPageCount: number
  pageSize: number
  items: CardItem[]
}
