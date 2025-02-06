import { Button } from '@/components'
import React, { ChangeEvent, useState } from 'react'
import { useCreateCharacteristicMutation } from '@/services/characteristics/characteristicsServise'

type Props = {
  clickSaveNewCharacteristic: () => void
}

export const AddCharacteristic = ({ clickSaveNewCharacteristic }: Props) => {
  const [createCharacteristic, { isLoading }] = useCreateCharacteristicMutation()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<null | string>(null)

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const changeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value)
  }

  const submitBtn = () => {
    if (title.length > 0) {
      createCharacteristic({ title, description }).then(() => {
        clickSaveNewCharacteristic()
      })
    }
    clickSaveNewCharacteristic()
  }

  return (
    <div className={'tables'}>
      <div className={'table'}>
        <input type="text" value={title} onChange={e => changeTitle(e)} />
      </div>
      <div className={'table'}>
        <input type="text" value={description || ''} onChange={e => changeDescription(e)} />
      </div>
      <div className={'table'}>
        <input type="checkbox" checked={true} disabled />
      </div>
      <div className={'table'}>
        <Button disabled>Просмотреть</Button>
      </div>
      <Button variant={'secondary'} onClick={submitBtn} disabled={isLoading}>
        A
      </Button>
    </div>
  )
}
