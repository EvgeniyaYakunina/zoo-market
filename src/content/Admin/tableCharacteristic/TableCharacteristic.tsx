import { CharDefaultValueById } from '@/content/Admin/tableCharacteristic/charDefaultValueById/CharDefaultValueById'
import { Characteristic } from '@/content/Admin/tableCharacteristic/characteristic/Characteristic'
import { AddCharacteristic } from '@/content/Admin/tableCharacteristic/addCharacteristic/AddCharacteristic'
import { Button } from '@/components'
import {
  useGetCharacteristicsQuery,
  useRemoveCharacteristicMutation,
} from '@/services/characteristics/characteristicsServise'
import { useState } from 'react'
import '../admin.css'

export const TableCharacteristic = () => {
  const { data: characteristics, isLoading } = useGetCharacteristicsQuery()
  useRemoveCharacteristicMutation()
  const [isView, setIsView] = useState(false)
  const [isNewChar, setIsNewChar] = useState(false)

  const [characterId, setCharacterId] = useState(0)

  if (isLoading) {
    return <div>Loading...</div>
  }
  const clickSaveNewCharacteristic = () => {
    setIsNewChar(false)
  }

  return (
    <div className={'container'}>
      {isView ? (
        <CharDefaultValueById setIsView={setIsView} isView={isView} characterId={characterId} />
      ) : (
        <div className={'characteristicsBlock'}>
          <div className={'Title'}>
            <span>Название</span>
            <span>Описание</span>
            <span>Отображать в фильтрах</span>
            <span>Шаблоны</span>
          </div>

          <div className={'tablesBlock'}>
            {characteristics?.items.map(c => {
              return (
                <Characteristic
                  key={c.id}
                  characteristic={c}
                  setCharacterId={setCharacterId}
                  setIsView={setIsView}
                />
              )
            })}
            {isNewChar ? (
              <AddCharacteristic clickSaveNewCharacteristic={clickSaveNewCharacteristic} />
            ) : (
              <Button onClick={() => setIsNewChar(true)}>Добавить</Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
