import React, { useState } from 'react'
import { charDefaultValueId } from '@/services/charDefaultValue/charDefaulValue.types'
import './card.css'
import { Button } from '@/components'
import { useGetCharDefaultValueIdQuery } from '@/services/charDefaultValue/charDefaultValue'
import { RequestCreateCharacteristic } from '@/services/cards/cards.types'
import { Tag } from './tag/Tag'
import { Select } from '@/content/Admin/tableCards/cards/card/select/Select'

type Props = {
  charDefaultValue: charDefaultValueId
  setCharacteristics: (value: RequestCreateCharacteristic[]) => void
  characteristics: RequestCreateCharacteristic[] | null
}

export const Card = ({ charDefaultValue, setCharacteristics, characteristics }: Props) => {
  const { data } = useGetCharDefaultValueIdQuery(charDefaultValue.characteristicId)

  const [tags, setTags] = useState<null | RequestCreateCharacteristic[]>(null)
  const [isSave, setIsSave] = useState(false)

  const removeTag = (value: string) => {
    if (tags) {
      setTags(tags?.filter(t => t.value !== value))
    }
  }
  const addAdditionalParams = (value: string, num: number) => {
    if (tags) {
      setTags(
        tags.map(t => (t.value === value ? { ...t, additionalParams: { количество: num } } : t))
      )
    }
  }
  const saveCardCharacteristic = () => {
    if (tags && characteristics) {
      setCharacteristics([...characteristics, ...tags])
      setIsSave(true)
      return
    }
    if (tags) {
      setCharacteristics([...tags])
      setIsSave(true)
    }
  }

  if (!data) {
    return <div>Loading</div>
  }

  return (
    <div className={'card'}>
      <div className={'titleAndSelectAndTagsBlock'}>
        <div className={'titleAndSelectBlock'}>
          <h2>{charDefaultValue.title}:</h2>
          <Select
            options={data}
            tags={tags}
            getValue={setTags}
            characteristicId={charDefaultValue.characteristicId}
          />
        </div>
        <div className={'tagsBlock'}>
          {tags?.map((t, i) => {
            return (
              <span className={'tag'} key={i}>
                {t.value}
                <button className={'removeTag'} onClick={() => removeTag(t.value)}>
                  x
                </button>
              </span>
            )
          })}
        </div>
      </div>

      <div className={'DopTagsBlock'}>
        {tags?.map((t, i) => {
          return (
            <Tag
              key={i}
              value={t.value}
              addAdditionalParams={addAdditionalParams}
              disabled={isSave}
            />
          )
        })}
      </div>
      <Button onClick={saveCardCharacteristic} disabled={isSave}>
        Save
      </Button>
    </div>
  )
}
