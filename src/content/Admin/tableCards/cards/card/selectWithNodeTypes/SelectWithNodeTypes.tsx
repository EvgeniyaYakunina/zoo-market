import { nodeType } from '@/services/nodeTypes/nodeTypes.type'

type Props = {
  options: nodeType[] | undefined

  getValue: (value: number) => void
}

export const SelectWithNodeTypes = ({ options, getValue }: Props) => {
  const change = (value: string) => {
    getValue(Number(value))
  }

  return (
    <select onChange={e => change(e.target.value)}>
      {options?.map(o => (
        <option key={o.id} value={o.id}>
          {o.type}
        </option>
      ))}
    </select>
  )
}
