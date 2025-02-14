//types for characteristics

// Определение типа для отдельной характеристики
export type Characteristic = {
  id: number
  title: string
  description: string | null
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
  description: string | null
}

// Тип для запроса обновления характеристики

export type UpdateCharacteristicRequest = {
  id: number
  title: string
  description: string | null
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
  description: string | null
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
  description: string | null
  createdAt: string
  updatedAt: string
  removedAt: string | null
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
  nodeDescription: string | null
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
  description: string | null
}

// Тип для ответа
export type CreateCardResponse = {
  id: {
    nodeId: number
    title: string
    nodeDescription: string | null
    createdAt: string
    updatedAt: string
    removedAt: string | null
    images: string[]
    nodeType: string
    nodeTypeDescription: string | null
    characteristics: CharacteristicResponse[][]
  }
}
// for get card by id
export type CardDetails = Omit<Node, 'nodeTypeId'> & {
  images: string[]
  nodeType: string
  nodeTypeDescription: string | null
  characteristics: CharacteristicResponse[][]
}

// Новый тип для отдельной карточки в ответе getAllCards
export type CardItem = Omit<Node, 'id' | 'nodeTypeId' | 'description'> & {
  nodeId: number
  nodeDescription: string | null
  images: string[]
  nodeType: string
  nodeTypeDescription: string | null
  characteristics: CharacteristicResponse[][]
}

// Новый тип для ответа getAllCards
export type AllCardsResponse = {
  pageNumber: number
  rowTotalCount: number
  totalPageCount: number
  pageSize: number
  items: CardItem[]
}
