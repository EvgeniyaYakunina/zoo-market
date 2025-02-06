export type RequestCreateCard = {
  title: string
  nodeDescription: null | string
  nodeTypeId: number
  images: string[]
  characteristics: RequestCreateCharacteristic[]
}

export type RequestCreateCharacteristic = {
  id: number
  value: string
  additionalParams: null | {
    количество: number
  }
}

export type ResponseCreateCharacteristic = [
  {
    title: string
    value: string
    additionalParams: null | {
      количество: number
    }
    description: string
  },
]
export type ResponseCreateCard = {
  id: {
    nodeId: number
    title: string
    nodeDescription: null | string
    createdAt: string
    updatedAt: string
    removedAt: null
    images: string[]
    nodeType: string
    nodeTypeDescription: null | string
    characteristics: ResponseCreateCharacteristic[]
  }
}
