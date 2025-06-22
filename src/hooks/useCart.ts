import { useEffect, useState } from 'react'
import { StaticImageData } from 'next/image'

export type Size = {
  value: string
  quantity: number
}

export type CartItem = {
  id: number
  image: string | StaticImageData
  // final price with discount applied
  price: number | undefined
  // original price before discount
  originalPrice?: number
  // discount percentage (0-100)
  sale?: number | null
  title: string
  description: string | null | undefined
  quantity: number
  availableSizes?: Size[]
  // prices in different currencies
  priceByn?: number | null
  priceRub?: number | null
}

export const useCart = (productId: number, productData?: Omit<CartItem, 'quantity'>) => {
  const [isInCart, setIsInCart] = useState(false)

  // Проверяем, есть ли товар в корзине при загрузке
  useEffect(() => {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]')
    setIsInCart(cartItems.some(item => item.id === productId))
  }, [productId])

  const addToCart = () => {
    if (!productData) return

    const storedCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const productToAdd: CartItem = {
      ...productData,
      quantity: 1,
    }

    if (!storedCart.some(item => item.id === productToAdd.id)) {
      const updatedCart = [...storedCart, productToAdd]
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      setIsInCart(true)
      window.dispatchEvent(new Event('cartUpdated')) // Обновляем Header
    }
  }

  return { isInCart, addToCart }
}
