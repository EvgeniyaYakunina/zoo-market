import { RootState } from '@/app/store'
import { loadCartFromStorage, clearCart } from '@/app/store/slices/cartSlice'
import { BasketList, Button, OrderModal, ResultModal } from '@/components'
import { OrderFormData } from '@/components/OrderModal/OrderModal'
import { CartItem } from '@/hooks'
import { ROUTES } from '@/utils/routes'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

type BasketFormSidebarProps = {
  carts: CartItem[]
  totalDiscounted: number
  onOrderResult: (success: boolean) => void
}

const getNextOrderNumber = (): string => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const lastOrderNumber = localStorage.getItem('lastOrderNumber') || `${datePart}-000`
  const [lastDate, lastSeq] = lastOrderNumber.split('-')
  const seq = lastDate === datePart ? parseInt(lastSeq, 10) + 1 : 1
  const nextOrderNumber = `${datePart}-${seq.toString().padStart(3, '0')}`
  localStorage.setItem('lastOrderNumber', nextOrderNumber)
  return nextOrderNumber
}

const createOrderObject = (formData: OrderFormData, carts: CartItem[], totalAmount: number) => ({
  orderNumber: getNextOrderNumber(),
  orderDate: new Date().toISOString(),
  customer: {
    fullName: formData.fullName,
    phone: formData.phone,
    email: formData.email,
    telegram: formData.telegram || '',
    comment: formData.comment || '',
  },
  items: carts.map(item => ({ ...item })),
  totalAmount,
  status: 'new',
})

function BasketFormSidebar({ carts, totalDiscounted, onOrderResult }: BasketFormSidebarProps) {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Get current currency from Redux store
  const currency = useSelector((state: RootState) => state.currency.value)
  const symbol = currency === 'BYN' ? 'Br' : '₽'

  // 1) Общее количество штук
  const totalItems = useMemo(
    () => carts.reduce((sum, cart) => sum + (cart.quantity || 1), 0),
    [carts]
  )

  // 2) Сумма до скидки: если есть originalPrice — берём его, иначе price
  const totalOriginal = useMemo(() => {
    console.log('=== Calculating totalOriginal ===')
    console.log('Current currency:', currency)

    const result = carts.reduce((sum, cart) => {
      // Calculate current price based on current currency
      const currentPrice =
        currency === 'BYN' ? cart.priceByn || cart.price || 0 : cart.priceRub || cart.price || 0

      // Calculate original price based on current currency
      // If there's a discount (originalPrice exists), we need to get the original price in current currency
      let originalPrice = currentPrice

      if (cart.originalPrice !== undefined && cart.sale) {
        // If we have originalPrice and sale, calculate what the original price should be in current currency
        // currentPrice = originalPrice * (1 - sale/100)
        // So: originalPrice = currentPrice / (1 - sale/100)
        originalPrice = currentPrice / (1 - cart.sale / 100)
      }

      console.log(`Item ${cart.id}:`, {
        priceByn: cart.priceByn,
        priceRub: cart.priceRub,
        price: cart.price,
        originalPrice: cart.originalPrice,
        sale: cart.sale,
        currentPrice,
        calculatedOriginalPrice: originalPrice,
        quantity: cart.quantity || 1,
        itemTotal: originalPrice * (cart.quantity || 1),
      })

      return sum + originalPrice * (cart.quantity || 1)
    }, 0)

    console.log('Total original:', result)
    return result
  }, [carts, currency])

  // 4) Ваша экономия
  const totalDiscount = totalOriginal - totalDiscounted

  // Форматируем число «1 234,56»
  const fmt = (value: number) =>
    value.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  // Если скидки нет, покажем 0, иначе – с минусом
  const discountLabel = totalDiscount > 0 ? `-${fmt(totalDiscount)}` : fmt(0)

  const handleOrderSubmit = (formData: OrderFormData) => {
    const newOrder = createOrderObject(formData, carts, totalDiscounted)

    const existingOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]')
    const updatedOrders = [...existingOrders, newOrder]
    localStorage.setItem('orderHistory', JSON.stringify(updatedOrders))

    // Очистить корзину через Redux
    dispatch(clearCart())

    onOrderResult(true)
    setIsModalOpen(false)
  }

  return (
    <div className="w-full lg:w-[360px]">
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6">
          {/* Сводка по корзине */}
          <div className="mb-6">
            <div className="flex justify-between mb-1 text-sm text-text-primary">
              <span>Товары, {totalItems} шт.</span>
              <span>
                {fmt(totalOriginal)} {symbol}
              </span>
            </div>
            <div className="flex justify-between mb-4 text-sm text-discount">
              <span>Моя скидка</span>
              <span>
                {discountLabel} {symbol}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">Итого</span>
              <span className="text-2xl font-bold">
                {fmt(totalDiscounted)} {symbol}
              </span>
            </div>
          </div>

          {/* Кнопка */}
          <Button fullWidth onClick={() => setIsModalOpen(true)}>
            Отправить заявку
          </Button>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOrderSubmit}
        onOrderResult={onOrderResult}
        carts={carts}
      />
    </div>
  )
}

export const Basket = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showResultModal, setShowResultModal] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  // Get cart items from Redux store
  const { items: carts, isLoaded } = useSelector((state: RootState) => state.cart)
  // Get current currency from Redux store
  const currency = useSelector((state: RootState) => state.currency.value)

  const handleBackToMain = () => {
    router.push(ROUTES.HOME)
  }

  // Load cart from localStorage on component mount
  useEffect(() => {
    if (!isLoaded) {
      dispatch(loadCartFromStorage())
    }
  }, [dispatch, isLoaded])

  const handleOrderResult = (success: boolean) => {
    setOrderSuccess(success)
    setShowResultModal(true)
  }

  // Calculate total discounted amount for the entire cart based on current currency
  const totalDiscounted = useMemo(() => {
    console.log('=== Calculating totalDiscounted ===')

    const result = carts.reduce((sum, cart) => {
      // Calculate price based on current currency
      const currentPrice =
        currency === 'BYN' ? cart.priceByn || cart.price || 0 : cart.priceRub || cart.price || 0

      console.log(`Discounted Item ${cart.id}:`, {
        currentPrice,
        quantity: cart.quantity || 1,
        itemTotal: currentPrice * (cart.quantity || 1),
      })

      return sum + currentPrice * (cart.quantity || 1)
    }, 0)

    console.log('Total discounted:', result)
    return result
  }, [carts, currency])

  return (
    <div className="bg-bg-secondary/20 min-w-[20em]">
      {carts.length == 0 ? (
        <div className="flex justify-center items-center m-4 md:m-8 p-8 bg-white rounded-2xl">
          <div className="w-[22em] flex items-center text-center flex-col">
            <h2 className="mb-3">В корзине пока пусто</h2>
            <p className="text-text-primary text-base leading-[22px] mb-4">
              Загляните на главную, чтобы выбрать товары или найдите нужное в поиске
            </p>
            <Button onClick={handleBackToMain}>Перейти в главную</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 p-8 mx-8">
          <div className="flex-1">
            <BasketList carts={carts} />
          </div>
          <div className="w-full lg:w-[360px]">
            <BasketFormSidebar
              carts={carts}
              totalDiscounted={totalDiscounted}
              onOrderResult={handleOrderResult}
            />
          </div>
        </div>
      )}

      {showResultModal && (
        <ResultModal isSuccess={orderSuccess} onClose={() => setShowResultModal(false)} />
      )}
    </div>
  )
}
