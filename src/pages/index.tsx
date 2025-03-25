import { Main } from '@/content'
import { useDispatch } from 'react-redux'
import { useGetAllCardsQuery } from '@/app/api'
import { useEffect } from 'react'
import { setCards } from '@/app/store'
import { UPDATE_ALL_CARDS_INTERVAL } from '@/utils'
import { useErrorHandler } from '@/hooks'
import { Loader } from '@/components'

export default function Home() {
  const dispatch = useDispatch()
  const handleError = useErrorHandler()
  const {
    data,
    error: allCardsError,
    isLoading: isAllCardsLoading,
  } = useGetAllCardsQuery(
    {},
    {
      pollingInterval: UPDATE_ALL_CARDS_INTERVAL,
      refetchOnMountOrArgChange: true,
    }
  )

  useEffect(() => {
    if (data) {
      dispatch(setCards(data))
    }
  }, [data, dispatch])
  useEffect(() => {
    if (allCardsError) {
      handleError(allCardsError)
    }
  }, [allCardsError])
  if (isAllCardsLoading) {
    return <Loader />
  }
  return (
    <div>
      <Main />
    </div>
  )
}
