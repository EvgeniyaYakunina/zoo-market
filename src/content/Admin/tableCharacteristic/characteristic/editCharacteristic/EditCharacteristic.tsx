import React, { ChangeEvent, useState } from 'react'
import { Button } from '@/components'
import { characteristic } from '@/services/characteristics/characteristicsServise.types'
import { useUpdateCharacteristicMutation } from '@/services/characteristics/characteristicsServise'

type Props = {
  characteristic: characteristic
  setEditMode: (bool: boolean) => void
}

export const EditCharacteristic = ({ characteristic, setEditMode }: Props) => {
  const [updateCharacteristic] = useUpdateCharacteristicMutation()

  const [title, setTitle] = useState(characteristic.title)
  const [description, setDescription] = useState(characteristic.description)
  const [isEdit, setIsEdit] = useState(false)

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const changeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value)
  }
  const saveBtn = () => {
    if (characteristic.title && characteristic.description !== title && description) {
      setIsEdit(true)
      updateCharacteristic({ title, description, id: characteristic.id }).then(() => {
        setEditMode(false)
        setIsEdit(false)
      })
    } else {
      setEditMode(false)
    }
  }

  return (
    <div className={'tables'} key={characteristic.id}>
      <div className={'table'}>
        <input type="text" value={title} onChange={e => changeTitle(e)} autoFocus />
      </div>
      <div className={'table'}>
        <input type={'text'} value={description} onChange={e => changeDescription(e)} />
      </div>
      <div className={'table'}>
        <input type="checkbox" checked={characteristic.isVisible} disabled />
      </div>
      <div className={'table'}>
        {characteristic.id < 5 && <Button disabled>Просмотреть</Button>}
      </div>
      <Button variant={'secondary'} onClick={saveBtn} disabled={isEdit}>
        S
      </Button>
    </div>
  )
}
