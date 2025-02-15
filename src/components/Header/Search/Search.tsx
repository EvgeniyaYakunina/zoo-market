import { CardItem, useSearchCardsMutation } from '@/app/api'
import { useDebounce } from '@/hooks'
import { useEffect } from 'react'

type SearchProps = {
  placeholder: string
  value: string
  setValue: (value: string) => void
  keyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onSearch: (results: CardItem[]) => void
}

export const Search = ({ placeholder, value, setValue, keyDown, onSearch }: SearchProps) => {
  const [searchCards] = useSearchCardsMutation()
  const debouncedSearchTerm = useDebounce(value, 600)

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchCards({ text: debouncedSearchTerm, limit: 10 })
        .unwrap()
        .then(results => {
          onSearch(results)
        })
        .catch(error => {
          console.error('Ошибка при поиске:', error)
        })
    } else {
      onSearch([])
    }
  }, [debouncedSearchTerm, searchCards, onSearch])

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={keyDown}
        className="w-full h-14 md:h-10 px-4 text-lg md:text-base border border-gray-300 rounded-lg focus:outline-none"
      />
    </div>
  )
}
