import { BasketList, Button, OrderModal, ResultModal } from '@/components'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@/utils/routes'
import { CartItem } from '@/hooks'
import { OrderFormData } from '@/components/OrderModal/OrderModal'

type BasketFormSidebarProps = {
  carts: CartItem[]
  totalDiscounted: number
  setCarts: (carts: CartItem[]) => void
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

function BasketFormSidebar({ carts, totalDiscounted, setCarts }: BasketFormSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  // 1) Общее количество штук
  const totalItems = useMemo(
    () => carts.reduce((sum, cart) => sum + (cart.quantity || 1), 0),
    [carts]
  )

  // 2) Сумма до скидки: если есть originalPrice — берём его, иначе price
  const totalOriginal = useMemo(
    () =>
      carts.reduce((sum, cart) => {
        const orig = cart.originalPrice !== undefined ? cart.originalPrice : cart.price
        return sum + (orig !== undefined ? orig * (cart.quantity || 1) : 0)
      }, 0),
    [carts]
  )

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

    // Очистить корзину
    localStorage.setItem('cart', JSON.stringify([]))
    setCarts([])
    window.dispatchEvent(new Event('cartUpdated'))

    setIsModalOpen(false)
    setOrderSuccess(true)
    setShowResultModal(true)
  }

  const handleResultClose = () => {
    setShowResultModal(false)
  }

  return (
    <div className="w-full lg:w-[360px]">
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6">
          {/* Сводка по корзине */}
          <div className="mb-6">
            <div className="flex justify-between mb-1 text-sm text-text-primary">
              <span>Товары, {totalItems} шт.</span>
              <span>{fmt(totalOriginal)} р.</span>
            </div>
            <div className="flex justify-between mb-4 text-sm text-discount">
              <span>Моя скидка</span>
              <span>{discountLabel} р.</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">Итого</span>
              <span className="text-2xl font-bold">{fmt(totalDiscounted)} р.</span>
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
        onOrderResult={(success: boolean) => {
          setOrderSuccess(success)
          setShowResultModal(true)
        }}
      />

      {showResultModal && <ResultModal isSuccess={orderSuccess} onClose={handleResultClose} />}
    </div>
  )
}

export const Basket = () => {
  const router = useRouter()
  const [carts, setCarts] = useState<CartItem[]>([])

  const handleBackToMain = () => {
    router.push(ROUTES.HOME)
  }

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCarts(storedCart)

    const onCartUpdated = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCarts(updatedCart)
    }

    window.addEventListener('cartUpdated', onCartUpdated)
    return () => window.removeEventListener('cartUpdated', onCartUpdated)
  }, [])

  // Calculate total discounted amount for the entire cart
  const totalDiscounted = useMemo(
    () => carts.reduce((sum, cart) => sum + (cart.price ?? 0) * (cart.quantity || 1), 0),
    [carts]
  )

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
            <BasketList carts={carts} setCarts={setCarts} />
          </div>
          <div className="w-full lg:w-[360px]">
            <BasketFormSidebar
              carts={carts}
              totalDiscounted={totalDiscounted}
              setCarts={setCarts}
            />
          </div>
        </div>
      )}
    </div>
  )
}
