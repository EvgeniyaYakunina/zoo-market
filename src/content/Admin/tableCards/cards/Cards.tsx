import React, { useState } from 'react'
import { useGetAllCharDefaultValueQuery } from '@/services/charDefaultValue/charDefaultValue'
import { Card } from '@/content/Admin/tableCards/cards/card/Card'
import '../../admin.css'
import '../cards.css'
import { RequestCreateCharacteristic } from '@/services/cards/cards.types'
import { useGetAllNodeTypesQuery } from '@/services/nodeTypes/nodeType'
import { SelectWithNodeTypes } from '@/content/Admin/tableCards/cards/card/selectWithNodeTypes/SelectWithNodeTypes'
import { Button } from '@/components'
import { charDefaultValueId } from '@/services/charDefaultValue/charDefaulValue.types'

export const Cards = () => {
  const { data: allCharDefaultValue } = useGetAllCharDefaultValueQuery({ size: 100 })
  const { data: allNodeTypes } = useGetAllNodeTypesQuery({})
  // const [createCard] = useCreateCardMutation()
  const uniqueCharIds = new Set() // Создаем Set для хранения уникальных ID

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [nodeTypeSelect, setNodeTypeSelect] = useState<null | number>(null)
  const [images, setImages] = useState<string[]>([
    'https://ls-drive.ru/wp-content/uploads/2023/01/nophoto.png',
  ])
  const [characteristics, setCharacteristics] = useState<null | RequestCreateCharacteristic[]>(null)

  console.log(setImages)

  const createCardHandler = () => {
    if (title && nodeTypeSelect && images) {
      console.log({
        title,
        nodeDescription: description === '' ? null : description,
        nodeTypeId: nodeTypeSelect,
        images,
        characteristics,
      })
    }
  }

  return (
    <div className={'container'}>
      <div className={'tableCards'}>
        <div className={'blockTitleAndDescription'}>
          <div className={'titleAndDescription'}>
            <span>title: </span>
            <input value={title} onChange={e => setTitle(e.currentTarget.value)} />
          </div>
          <div className={'titleAndDescription'}>
            <span>description: </span>
            <textarea value={description} onChange={e => setDescription(e.currentTarget.value)} />
          </div>
          <div className={'titleAndDescription'}>
            <span>nodeTypeId: </span>
            <SelectWithNodeTypes options={allNodeTypes?.items} getValue={setNodeTypeSelect} />
          </div>
        </div>
        {allCharDefaultValue?.items.map((char: charDefaultValueId) => {
          if (!uniqueCharIds.has(char.characteristicId)) {
            // Проверяем, встречался ли ID ранее
            uniqueCharIds.add(char.characteristicId) // Добавляем ID в Set, если он уникальный
            return (
              <Card
                key={char.id}
                charDefaultValue={char}
                setCharacteristics={setCharacteristics}
                characteristics={characteristics}
              />
            )
          }
          return null // Не рендерим элемент, если ID уже встречался
        })}
        <Button onClick={createCardHandler}>Создать карту</Button>
        <Button>Предпросмотр</Button>
      </div>
    </div>
  )
}
