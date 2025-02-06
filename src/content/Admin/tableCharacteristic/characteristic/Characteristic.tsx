import React, { ChangeEvent, useState } from 'react'
import { Button } from '@/components'
import { characteristic } from '@/services/characteristics/characteristicsServise.types'
import {
  useRemoveCharacteristicMutation,
  useUpdateCharacteristicMutation,
} from '@/services/characteristics/characteristicsServise'
import { EditCharacteristic } from '@/content/Admin/tableCharacteristic/characteristic/editCharacteristic/EditCharacteristic'

type Props = {
  characteristic: characteristic
  setCharacterId: (num: number) => void
  setIsView: (bool: boolean) => void
}

export const Characteristic = ({ characteristic, setCharacterId, setIsView }: Props) => {
  const [removeCharacteristic, { isLoading: isLoadingRemoveChar }] =
    useRemoveCharacteristicMutation()
  const [updateCharacteristic] = useUpdateCharacteristicMutation()

  const [editMode, setEditMode] = useState(false)
  const [isChecked, setIsChecked] = useState(characteristic.isVisible)
  const [isEdit, setIsEdit] = useState(false)

  const clickTemplate = (id: number) => {
    setCharacterId(id)
    setIsView(true)
  }
  const removeCharacteristicHandler = (id: number) => {
    removeCharacteristic(id)
  }
  const doubleClick = () => {
    setEditMode(true)
  }
  const checkedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
    setIsChecked(status)
    setIsEdit(true)
    updateCharacteristic({ ...characteristic, isVisible: status }).then(() => setIsEdit(false))
  }

  return (
    <>
      {editMode ? (
        <EditCharacteristic characteristic={characteristic} setEditMode={setEditMode} />
      ) : (
        <div className={'tables'} key={characteristic.id}>
          <div className={'table pointer'} onDoubleClick={doubleClick}>
            {characteristic.title}
          </div>
          <div className={'table pointer'} onDoubleClick={doubleClick}>
            <span className={'hidden'}>{characteristic.description}</span>
          </div>
          <div className={'table'}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={e => checkedHandler(e)}
              disabled={isEdit}
            />
          </div>
          <div className={'table'}>
            <Button onClick={() => clickTemplate(characteristic.id)}>Просмотреть</Button>
          </div>
          <Button
            onClick={() => removeCharacteristicHandler(characteristic.id)}
            disabled={isLoadingRemoveChar}
          >
            X
          </Button>
        </div>
      )}
    </>
  )
}
