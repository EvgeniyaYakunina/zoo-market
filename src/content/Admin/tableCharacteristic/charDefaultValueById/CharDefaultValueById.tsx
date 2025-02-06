import { Button } from '@/components'
import { charDefaultValueId } from '@/services/charDefaultValue/charDefaulValue.types'
import {
  useCreateCharDefaultValueMutation,
  useGetCharDefaultValueIdQuery,
  useRemoveCharDefaultValueMutation,
} from '@/services/charDefaultValue/charDefaultValue'
import { ChangeEvent, useState } from 'react'
import { CharValues } from '@/content/Admin/tableCharacteristic/charDefaultValueById/charValues/CharValues'

type Props = {
  setIsView: (bool: boolean) => void
  characterId: number
  isView: boolean
}

export const CharDefaultValueById = ({ setIsView, characterId, isView }: Props) => {
  const { data: charDefaultValueId, isLoading } = useGetCharDefaultValueIdQuery(characterId, {
    skip: !isView,
  })
  const [createCharDefaultValue] = useCreateCharDefaultValueMutation()
  const [removeCharDefaultValue] = useRemoveCharDefaultValueMutation()

  const [addMode, setAddMode] = useState(false)
  const [isDisable, setIsDisable] = useState(false)
  const [value, setValue] = useState('')

  if (isLoading) {
    return <div>Loading...</div>
  }

  const backBtnHandler = () => {
    setIsView(false)
  }
  const addModeHandler = () => {
    setAddMode(!addMode)
  }
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const removeCharHandler = (id: number) => {
    setIsDisable(true)
    removeCharDefaultValue(id).then(() => {
      setIsDisable(false)
    })
  }
  const saveNewChar = () => {
    if (value !== '') {
      setIsDisable(true)
      createCharDefaultValue({
        value,
        title: charDefaultValueId?.[0].title || '',
        characteristicId: characterId,
      }).then(() => {
        setValue('')
        setAddMode(false)
        setIsDisable(false)
        setValue('')
      })
    } else {
      setAddMode(false)
    }
  }

  return (
    <div className={'characteristicsBlock'}>
      <div className={'Title'}>
        <Button onClick={backBtnHandler}>Назад</Button>
        <span>{charDefaultValueId?.[0].title}</span>
      </div>

      <div className={'tablesBlock'}>
        {charDefaultValueId ? (
          <>
            <div>
              {charDefaultValueId?.map((c: charDefaultValueId) => (
                <CharValues
                  key={c.id}
                  char={c}
                  removeCharHandler={removeCharHandler}
                  isDisable={isDisable}
                />
              ))}
            </div>
            {addMode ? (
              <div className={'tableWithChange2'}>
                <input type="text" value={value} onChange={e => changeInput(e)} autoFocus />
                <Button onClick={saveNewChar} disabled={isDisable}>
                  Save
                </Button>
              </div>
            ) : null}
            <Button onClick={addModeHandler}>Добавить</Button>
          </>
        ) : (
          <>
            <div className={'tablesBlock'}>
              {addMode ? (
                <div className={'tableWithChange2'}>
                  <input type="text" value={value} onChange={e => changeInput(e)} autoFocus />
                  <Button onClick={saveNewChar} disabled={isDisable}>
                    Save
                  </Button>
                </div>
              ) : (
                <div>пусто</div>
              )}
            </div>
            <Button onClick={addModeHandler} disabled={isDisable}>
              Добавить
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
