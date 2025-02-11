import { IoPerson } from 'react-icons/io5'
import { BsCart2 } from 'react-icons/bs'
import { ROUTES } from '@/utils/routes'
import { useRouter } from 'next/router'
import { CartItem } from '@/components'

export const SignUpAndBasket = ({ carts }: { carts: CartItem[] }) => {
  const router = useRouter()
  const totalItems = carts.reduce((sum, cart) => sum + (cart.quantity || 1), 0)
  return (
    <div className="flex space-x-6 px-4">
      <ul className="relative flex flex-col items-center text-white/60 hover:text-white transition-all">
        <div className="flex flex-col items-center">
          <IoPerson className="w-8 h-8" onClick={() => router.push(ROUTES.SIGN_IN)} />
          <span className="text-sm">Войти</span>
        </div>
      </ul>

      <ul className="relative flex flex-col items-center text-white/60 hover:text-white transition-all">
        <div className="flex flex-col items-center relative">
          <BsCart2 className="w-8 h-8" onClick={() => router.push(ROUTES.BASKET)} />
          <span className="text-sm">Корзина</span>
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 text-xs w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
      </ul>
    </div>
  )
}
