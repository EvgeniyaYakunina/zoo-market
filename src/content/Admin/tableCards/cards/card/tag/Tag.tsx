import './tag.css'
import { Button } from '@/components'
import { useState } from 'react'

type Props = {
  value: string
  addAdditionalParams: (value: string, num: number) => void
  disabled: boolean
}

export const Tag = ({ value, addAdditionalParams, disabled }: Props) => {
  const [addMode, setAddMode] = useState(false)
  const [isSave, setIsSave] = useState(false)
  const [num, setNum] = useState<null | number>(null)

  const saveInput = () => {
    if (num) {
      addAdditionalParams(value, num)
      setIsSave(true)
    }
  }

  return (
    <div className={'wrapperTagAdditional'}>
      <div className={'tagAdditional'}>
        <div>{value}</div>- <Button onClick={() => setAddMode(!addMode)}>Доп.</Button>
      </div>
      {addMode ? (
        <div className={'tagAdditionalChildren'}>
          кол.во -{' '}
          <input
            type="number"
            value={String(num)}
            onChange={e => setNum(Number(e.currentTarget.value))}
          />
          <Button onClick={saveInput} disabled={disabled || isSave}>
            save
          </Button>
        </div>
      ) : null}
    </div>
  )
}
