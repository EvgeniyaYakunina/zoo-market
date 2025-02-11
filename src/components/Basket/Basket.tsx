import { BasketList, CartItem } from '@/components/Basket/BasketList'
import { Button } from '@/components'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@/utils/routes'

function BasketFormSidebar({ carts = [] }: { carts?: CartItem[] }) {
  const totalItems = carts.reduce((sum, cart) => sum + (cart.quantity || 1), 0)
  const finalPrice = carts.reduce(
    (sum, cart) => sum + Math.floor(cart.price) * (cart.quantity || 1),
    0
  )

  return (
    <div className="w-full lg:w-[360px]">
      <div className="bg-white rounded-2xl">
        <div className="p-6">
          <div className="mb-4">
            <p className="flex justify-between">
              <span className="text-sm text-text-muted mb-2">
                Товары, <span>{totalItems} шт</span>
              </span>
              <span className="text-sm text-text-primary mb-2">{finalPrice} $</span>
            </p>

            <div className="flex justify-between">
              <h2 className="text-2xl leading-8">Итог</h2>
              <h2 className="text-2xl leading-8">{finalPrice} $</h2>
            </div>
          </div>

          <Button fullWidth>Заказать</Button>
        </div>
      </div>
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
  }, [])

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
            <BasketFormSidebar carts={carts} />
          </div>
        </div>
      )}
    </div>
  )
}
