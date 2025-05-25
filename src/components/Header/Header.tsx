import { CardItem, useLazyGetAllCardsQuery } from '@/app/api'
import { AppDispatch, RootState, setCards, setSearchResults } from '@/app/store'
import { Currency, setCurrency } from '@/app/store/slices/currencySlice'
import { Search, SignUpAndBasket } from '@/components'
import { CartItem, useWindowResize } from '@/hooks'
import { ROUTES } from '@/utils/routes'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { BsCart2 } from 'react-icons/bs'
import { FiCheck } from 'react-icons/fi'
import { GoHomeFill } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import ReactCountryFlag from 'react-country-flag'
import { RequestsTrigger } from './RequestsTrigger'
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
  const currency = useSelector((state: RootState) => state.currency.value)
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
            <div className="ml-auto flex items-center ">
              <SignUpAndBasket carts={carts} />
              <RequestsTrigger />
              {/* currency dropdown */}
              <div ref={curRef} className="relative px-[1rem]">
                <button
                  onClick={() => setOpenCur(o => !o)}
                  className="flex items-center border border-gray-200 text-black rounded-lg px-3 py-2 shadow-sm w-max"
                >
                  <ReactCountryFlag
                    countryCode={currency === 'RUB' ? 'RU' : 'BY'}
                    svg
                    className="w-5 h-5 mr-2"
                  />
                  <span className="font-medium">{currency}</span>
                </button>

                {openCur && (
                  <ul className="absolute top-10 left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-20">
                    {[
                      { code: 'RU', label: 'RUB Российский рубль', value: 'RUB' as Currency },
                      { code: 'BY', label: 'BYN Белорусский рубль', value: 'BYN' as Currency },
                    ].map(opt => (
                      <li
                        key={opt.value}
                        onClick={() => handleCurrencySelect(opt.value)}
                        className={`
                          flex items-center justify-between
                          px-4 py-2 text-sm text-gray-700
                          hover:bg-gray-50 cursor-pointer
                          ${currency === opt.value ? 'bg-gray-200' : ''}
                        `}
                      >
                        <div className="flex items-center">
                          <ReactCountryFlag countryCode={opt.code} svg className="w-5 h-5 mr-2" />
                          <span>{opt.label}</span>
                        </div>
                        {currency === opt.value && <FiCheck className="text-gray-600" />}
                      </li>
                    ))}
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
