import { useEffect, useState } from 'react'
import { StaticImageData } from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { addItem, loadCartFromStorage } from '@/app/store/slices/cartSlice'

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
  // quantity per size for items with multiple sizes
  sizeQuantities?: { [key: string]: number }
}

export const useCart = (productId: number, productData?: Omit<CartItem, 'quantity'>) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const [isInCart, setIsInCart] = useState(false)

  // Проверяем, есть ли товар в корзине при загрузке
  useEffect(() => {
    // Загружаем корзину из localStorage при первой загрузке
    if (cartItems.length === 0) {
      dispatch(loadCartFromStorage())
    }

    // Проверяем наличие товара в корзине
    setIsInCart(cartItems.some(item => item.id === productId))
  }, [productId, cartItems, dispatch])

  const addToCart = () => {
    if (!productData) return

    if (!isInCart) {
      const productToAdd: CartItem = {
        ...productData,
        quantity: 1,
      }

      dispatch(addItem(productToAdd))
      setIsInCart(true)
    }
  }

  return { isInCart, addToCart }
}
