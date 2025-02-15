import { Main } from '@/content'
import { useDispatch } from 'react-redux'
import { useGetAllCardsQuery } from '@/app/api'
import { useEffect } from 'react'
import { setCards } from '@/app/store/slices/cardsSlice'

export default function Home() {
  const dispatch = useDispatch()
  const { data } = useGetAllCardsQuery()

  useEffect(() => {
    if (data) {
      dispatch(setCards(data))
    }
  }, [data, dispatch])

  return (
    <div>
      <Main />
    </div>
  )
}
