import { noImage } from '@/assets'
import { CartItem } from '@/hooks'
import Image from 'next/image'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { removeItem, updateItemSizeQuantities } from '@/app/store/slices/cartSlice'
import { useRouter } from 'next/router'

export type CartProps = {
  cart: CartItem
}

type SizeQuantity = {
  [key: string]: number
}

function BasketItem({ cart }: CartProps) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { price, availableSizes, priceByn, priceRub } = cart

  // Get current currency from Redux store
  const currency = useSelector((state: RootState) => state.currency.value)
  const symbol = currency === 'BYN' ? 'Br' : '₽'

  // Calculate price based on current currency
  const currentPrice = currency === 'BYN' ? priceByn || price || 0 : priceRub || price || 0
  const roundPrice = Math.floor(currentPrice)

  // Получаем размеры из Redux store (из cart)
  const sizeQuantities: SizeQuantity =
    cart.sizeQuantities ||
    (availableSizes
      ? availableSizes.reduce((acc, size, index) => {
          acc[size.value] = index === 0 ? 1 : 0
          return acc
        }, {} as SizeQuantity)
      : { default: cart.quantity || 1 })

  const totalQuantity = availableSizes
    ? Object.values(sizeQuantities).reduce((sum, qty) => sum + qty, 0)
    : sizeQuantities.default

  // Общие классы для кнопок
  const btnCls = `
    w-6 h-6 flex items-center justify-center
    border-none rounded-lg bg-border-primary/20
    text-sm cursor-pointer hover:bg-[#d7d7dd]
  `
    .trim()
    .replace(/\s+/g, ' ')

  const valCls = 'w-6 text-center'

  const incrementSize = (size: string) => {
    const maxQ = availableSizes?.find(s => s.value === size)?.quantity || 99
    if (sizeQuantities[size] < maxQ) {
      const updated = { ...sizeQuantities, [size]: sizeQuantities[size] + 1 }
      dispatch(updateItemSizeQuantities({ id: cart.id, sizeQuantities: updated }))
    }
  }

  const decrementSize = (size: string) => {
    if (sizeQuantities[size] > 0) {
      const updated = { ...sizeQuantities, [size]: sizeQuantities[size] - 1 }
      dispatch(updateItemSizeQuantities({ id: cart.id, sizeQuantities: updated }))
    }
  }

  const increment = () => {
    const updated = { default: sizeQuantities.default + 1 }
    dispatch(updateItemSizeQuantities({ id: cart.id, sizeQuantities: updated }))
  }

  const decrement = () => {
    if (sizeQuantities.default > 1) {
      const updated = { default: sizeQuantities.default - 1 }
      dispatch(updateItemSizeQuantities({ id: cart.id, sizeQuantities: updated }))
    }
  }

  const deleteCartItem = () => {
    dispatch(removeItem(cart.id))
  }

  const goToProduct = () => {
    router.push(`/card/${cart.id}`)
  }

  return (
    <div className="flex items-center justify-between mt-4">
      {/* 1) Изображение + название */}
      <div className="flex items-center flex-1 min-w-0 cursor-pointer" onClick={goToProduct}>
        <Image
          src={cart.image || noImage}
          alt={cart.title}
          width={96}
          height={128}
          className="rounded-2xl mr-5 flex-shrink-0"
        />
        <div className="text-text-primary truncate">{cart.title}</div>
      </div>

      {/* 2) Количественные контролы */}
      <div className="flex items-center flex-1 justify-center space-x-8">
        {cart.availableSizes ? (
          cart.availableSizes.map(size => (
            <div key={size.value} className="flex flex-col items-center">
              <span className="text-sm mb-1">{size.value}</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => decrementSize(size.value)} className={btnCls}>
                  –
                </button>
                <span className={valCls}>{sizeQuantities[size.value] || 0}</span>
                <button onClick={() => incrementSize(size.value)} className={btnCls}>
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center space-x-2">
            <button onClick={decrement} className={btnCls}>
              –
            </button>
            <span className={valCls}>{sizeQuantities.default}</span>
            <button onClick={increment} className={btnCls}>
              +
            </button>
          </div>
        )}
      </div>

      {/* 3) Цена и удаление */}
      <div className="flex flex-col items-end flex-shrink-0 ml-8">
        <h3 className="text-lg leading-6">
          {roundPrice * totalQuantity} {symbol}
        </h3>
        <button onClick={deleteCartItem} className="mt-2 p-1 hover:bg-gray-100 rounded">
          <MdOutlineDeleteOutline className="w-6 h-6 text-text-muted" />
        </button>
      </div>
    </div>
  )
}

export const BasketList = ({ carts }: { carts: CartItem[] }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Корзина <span className="text-text-secondary">({carts.length})</span>
      </h2>

      {carts.map(cartItem => (
        <BasketItem key={cartItem.id} cart={cartItem} />
      ))}
    </div>
  )
}
