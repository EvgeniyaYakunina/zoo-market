import { useState } from 'react'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import Image from 'next/image'
import { noImage } from '@/assets'

export type CartItem = {
  image: string
  price: number
  title: string
  description: string
  rating: {
    rate: number
    count: number
  }
  id: number
  quantity?: number
}

export type CartProps = {
  cart: CartItem
  setCarts: (carts: CartItem[]) => void
  carts: CartItem[]
}
function BasketItem({ cart, setCarts }: CartProps) {
  const { image, price, title } = cart
  const roundPrice = Math.floor(price)
  const [value, setValue] = useState(cart.quantity || 1)

  const updateCartItemQuantity = (newQuantity: number) => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const updatedCarts = storedCart.map((item: CartItem) =>
      item.id === cart.id ? { ...item, quantity: newQuantity } : item
    )
    localStorage.setItem('cart', JSON.stringify(updatedCarts))
    setCarts(updatedCarts) // Обновляем состояние корзины
    window.dispatchEvent(new Event('cartUpdated')) // Обновляем Header
  }

  const decrement = () => {
    if (value > 1) {
      const newQuantity = value - 1
      setValue(newQuantity)
      updateCartItemQuantity(newQuantity)
    }
  }

  const increment = () => {
    if (value < 99) {
      const newQuantity = value + 1
      setValue(newQuantity)
      updateCartItemQuantity(newQuantity)
    }
  }

  const deleteCartItem = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const updatedCarts = storedCart.filter((item: CartItem) => item.id !== cart.id)
    localStorage.setItem('cart', JSON.stringify(updatedCarts))
    setCarts(updatedCarts)
    window.dispatchEvent(new Event('cartUpdated')) // Обновляем Header
  }

  return (
    <div className="flex justify-between mt-4">
      <div className="flex justify-between w-full max-w-full lg:max-w-[calc(100%-195px)]">
        <div className="flex max-w-[560px] w-full">
          <div>
            {image ? (
              <Image src={image} alt={title} width={96} height={128} className="rounded-2xl mr-5" />
            ) : (
              <Image
                src={noImage}
                alt={'noImage'}
                width={96}
                height={128}
                className="rounded-2xl mr-5"
              />
            )}
          </div>
          <div className="flex flex-col">
            <div className="text-text-primary break-words">{title}</div>
          </div>
        </div>

        <div className="w-[180px] mt-2 lg:mt-0">
          <button
            onClick={decrement}
            type="button"
            className="w-8 h-8 border-none rounded-lg bg-border-primary/20 text-lg cursor-pointer hover:bg-[#d7d7dd]"
          >
            -
          </button>
          <input
            onChange={e => setValue(Number(e.target.value))}
            value={value}
            type="number"
            className="w-8 h-8 p-0 rounded-none text-center border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            readOnly
          />
          <button
            onClick={increment}
            type="button"
            className="w-8 h-8 border-none rounded-lg bg-border-primary/20 text-lg cursor-pointer hover:bg-[#d7d7dd]"
          >
            +
          </button>
        </div>
      </div>

      <div className="w-[195px] text-right">
        <div className="all_price_basket_product">
          <h3 className="text-lg leading-6">{roundPrice * value} $</h3>
          <del className="text-sm leading-5 mt-1 text-text-muted font-normal">
            {(roundPrice + 570) * value} $
          </del>
        </div>

        <div className="mt-4">
          <button
            onClick={deleteCartItem}
            type="button"
            className="bg-transparent border-none cursor-pointer ml-3"
          >
            <MdOutlineDeleteOutline className="w-6 h-6 text-text-muted" />
          </button>
        </div>
      </div>
    </div>
  )
}

export const BasketList = ({
  carts,
  setCarts,
}: {
  carts: CartItem[]
  setCarts: (carts: CartItem[]) => void
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Корзина <span className="text-text-secondary">({carts.length})</span>
      </h2>

      {carts.map(cartItem => (
        <BasketItem key={cartItem.id} cart={cartItem} carts={carts} setCarts={setCarts} />
      ))}
    </div>
  )
}
