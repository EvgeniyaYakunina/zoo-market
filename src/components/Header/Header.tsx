import { CardItem, useLazyGetAllCardsQuery } from '@/app/api'
import { AppDispatch, RootState, setCards, setSearchResults } from '@/app/store'
import { Currency, setCurrency } from '@/app/store/slices/currencySlice'
import { CartItem, Search, SignUpAndBasket } from '@/components'
import { useWindowResize } from '@/hooks'
import { ROUTES } from '@/utils/routes'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { BsCart2 } from 'react-icons/bs'
import { FiCheck } from 'react-icons/fi'
import { GoHomeFill } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'

export const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { width } = useWindowResize()

  // search
  const [value, setValue] = useState<string>('')
  const [fetchAllCards, { data: allCards }] = useLazyGetAllCardsQuery()
  const handleSearchResults = (results: CardItem[]) => dispatch(setSearchResults(results))

  // cart
  const [carts, setCarts] = useState<CartItem[]>([])
  useEffect(() => {
    const updateCart = () => {
      const stored = JSON.parse(localStorage.getItem('cart') || '[]')
      setCarts(Array.isArray(stored) ? stored : [])
    }
    updateCart()
    window.addEventListener('cartUpdated', updateCart)
    return () => window.removeEventListener('cartUpdated', updateCart)
  }, [])
  const totalItems = carts.reduce((sum, c) => sum + (c.quantity || 1), 0)

  // home click
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

  // ========== currency selector ==========
  const currency = useSelector((s: RootState) => s.currency.value)
  const [openCur, setOpenCur] = useState(false)
  const curRef = useRef<HTMLDivElement>(null)

  // // on start load country → currency
  // useEffect(() => {
  //   dispatch(fetchCurrency())
  // }, [dispatch])

  // close by click outside
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (curRef.current && !curRef.current.contains(e.target as Node)) {
        setOpenCur(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const handleCurrencySelect = (c: Currency) => {
    dispatch(setCurrency(c))
    setOpenCur(false)
  }

  // ========================================

  return (
    <>
      <header className="fixed w-full z-20 top-0 p-4 bg-accent-100">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="mr-4">
            <div
              className="text-white text-4xl font-semibold cursor-pointer"
              onClick={handleHomeClick}
            >
              ZooMarket
            </div>
          </div>

          <Search
            placeholder="Найти"
            value={value}
            setValue={setValue}
            onSearch={handleSearchResults}
          />

          {width && width >= 900 && (
            <div className="ml-auto flex items-center space-x-4">
              <SignUpAndBasket carts={carts} />

              {/* currency dropdown */}
              <div ref={curRef} className="relative">
                <button
                  onClick={() => setOpenCur(o => !o)}
                  className="flex items-center bg-white text-black rounded px-2 py-1"
                >
                  <span className="mr-1">{currency === 'RUB' ? '🇷🇺' : '🇧🇾'}</span>
                  <span className="font-medium">{currency}</span>
                  <span className="ml-1 text-sm">▾</span>
                </button>

                {openCur && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg overflow-hidden">
                    <li
                      className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCurrencySelect('RUB')}
                    >
                      <span className="mr-2">🇷🇺</span>
                      <span className="flex-1">RUB Российский рубль</span>
                      {currency === 'RUB' && <FiCheck />}
                    </li>
                    <li
                      className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCurrencySelect('BYN')}
                    >
                      <span className="mr-2">🇧🇾</span>
                      <span className="flex-1">BYN Белорусский рубль</span>
                      {currency === 'BYN' && <FiCheck />}
                    </li>
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {width && width < 900 && (
        <div className="border-t border-gray-300 bg-white w-full p-4 fixed bottom-0 z-50 shadow-md md:hidden">
          <ul className="flex justify-around">
            <li>
              <GoHomeFill
                onClick={handleHomeClick}
                className="w-6 h-6 cursor-pointer text-gray-700"
              />
            </li>
            <li className="relative">
              <BsCart2
                onClick={() => router.push(ROUTES.BASKET)}
                className="w-6 h-6 cursor-pointer text-gray-700"
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 text-xs w-5 h-5 bg-red-500 text-white rounded-full text-center">
                  {totalItems}
                </span>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
