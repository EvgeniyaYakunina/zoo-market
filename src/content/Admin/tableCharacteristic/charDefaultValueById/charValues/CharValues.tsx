import { Button } from '@/components'
import { charDefaultValueId } from '@/services/charDefaultValue/charDefaulValue.types'
import { ChangeEvent, useState } from 'react'
import { useUpdateCharDefaultValueMutation } from '@/services/charDefaultValue/charDefaultValue'

type Props = {
  char: charDefaultValueId
  removeCharHandler: (id: number) => void
  isDisable: boolean
}

export const CharValues = ({ char, removeCharHandler, isDisable }: Props) => {
  const [updateCharDefaultValue] = useUpdateCharDefaultValueMutation()

  const [editMode, setEditMode] = useState(false)
  const [isDisableInput, setDisableInput] = useState(false)
  const [value, setValue] = useState(char.value)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const blurHandler = () => {
    if (value === char.value) {
      setEditMode(false)
    }
  }
  const saveCharHandler = () => {
    if (value !== '' || value !== char.value) {
      setDisableInput(true)
      updateCharDefaultValue({ id: char.id, value }).then(() => {
        setDisableInput(false)
        setEditMode(false)
      })
    } else {
      setEditMode(false)
    }
  }

  return (
    <>
      <div key={char.id} className={'tableWithChange'}>
        {editMode ? (
          <div>
            <input
              type="text"
              onBlur={blurHandler}
              autoFocus
              value={value}
              onChange={changeHandler}
            />
            <Button onClick={saveCharHandler} disabled={isDisableInput}>
              Save
            </Button>
          </div>
        ) : (
          <span onDoubleClick={() => setEditMode(true)}>{char.value}</span>
        )}
        <Button onClick={() => removeCharHandler(char.id)} disabled={isDisable}>
          X
        </Button>
      </div>
    </>
  )
}
