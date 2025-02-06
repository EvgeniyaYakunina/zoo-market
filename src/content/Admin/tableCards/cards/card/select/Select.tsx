import { charDefaultValueId } from '@/services/charDefaultValue/charDefaulValue.types'
import { RequestCreateCharacteristic } from '@/services/cards/cards.types'

type Props = {
  options: charDefaultValueId[]
  tags?: RequestCreateCharacteristic[] | null
  getValue: (value: RequestCreateCharacteristic[]) => void
  characteristicId: number
}

export const Select = ({ options, getValue, tags, characteristicId }: Props) => {
  const change = (value: string) => {
    const newTag = {
      id: characteristicId,
      value,
      additionalParams: null,
    }
    if (tags) {
      getValue([...tags, newTag])
    } else {
      getValue([newTag])
    }
  }

  return (
    <select onChange={e => change(e.target.value)}>
      {options.map(o => (
        <option key={o.id} value={o.value}>
          {o.value}
        </option>
      ))}
    </select>
  )
}
