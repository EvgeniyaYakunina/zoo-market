import { CardItem, useLazyGetAllCardsQuery } from '@/app/api'
import { setCards, setSearchResults } from '@/app/store'
import { CartItem, Search, SignUpAndBasket } from '@/components'
import { useWindowResize } from '@/hooks'
import { ROUTES } from '@/utils/routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsCart2 } from 'react-icons/bs'
import { GoHomeFill } from 'react-icons/go'
import { useDispatch } from 'react-redux'

export const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { width } = useWindowResize()
  const [value, setValue] = useState<string>('')
  const [carts, setCarts] = useState<CartItem[]>([])

  const [fetchAllCards, { data: allCards }] = useLazyGetAllCardsQuery()

  const totalItems = carts.reduce((sum, cart) => sum + (cart.quantity || 1), 0)

  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCarts(Array.isArray(storedCart) ? storedCart : [])
    }

    updateCart()
    window.addEventListener('cartUpdated', updateCart)

    return () => window.removeEventListener('cartUpdated', updateCart)
  }, [])

  const handleSearchResults = (results: CardItem[]) => {
    dispatch(setSearchResults(results))
  }

  const handleHomeClick = async () => {
    setValue('')
    router.push(ROUTES.HOME)
    window.dispatchEvent(new Event('resetFilters'))

    await fetchAllCards({ pageNumber: 1, pageSize: 100 })

    if (allCards) {
      dispatch(setCards(allCards))
      dispatch(setSearchResults([]))
    }
  }

  return (
    <>
      <header className="fixed w-full z-20 top-0 p-4 bg-accent-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mt-2">
            <div className="mr-4">
              <div
                className="text-white text-4xl font-semibold cursor-pointer"
                onClick={handleHomeClick}
              >
                {'ZooMarket'}
              </div>
            </div>
            <Search
              placeholder="Найти"
              value={value}
              setValue={setValue}
              onSearch={handleSearchResults}
            />
            {width && width >= 900 && <SignUpAndBasket carts={carts} />}
          </div>
        </div>
      </header>

      {width && width < 900 && (
        <div className="border-t border-gray-300 block bg-white w-full p-4 fixed bottom-0 z-50 shadow-md md:hidden">
          <ul className="flex justify-around">
            {' '}
            <li>
              <GoHomeFill onClick={handleHomeClick} className={`w-6 h-6 cursor-pointer`} />
            </li>
            <li className={'relative'}>
              <BsCart2
                onClick={() => router.push(ROUTES.BASKET)}
                className={`w-6 h-6 cursor-pointer`}
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 text-xs w-5 h-5 bg-bg-red-500 text-white rounded-full text-center">
                  {totalItems}
                </span>
              )}
            </li>
            {/* TODO: add sign in if needed */}
            {/* <li>
              <IoPerson
                onClick={() => router.push(ROUTES.SIGN_IN)}
                className={`w-6 h-6 cursor-pointer`}
              />
            </li> */}
          </ul>
        </div>
      )}
    </>
  )
}
