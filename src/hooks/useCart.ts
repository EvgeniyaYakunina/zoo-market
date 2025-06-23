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
  const isLoaded = useSelector((state: RootState) => state.cart.isLoaded)
  const [isInCart, setIsInCart] = useState(false)

  // Загружаем корзину из localStorage только при первой загрузке
  useEffect(() => {
    if (!isLoaded) {
      dispatch(loadCartFromStorage())
    }
  }, [dispatch, isLoaded])

  // Отдельный эффект для проверки наличия товара в корзине
  useEffect(() => {
    setIsInCart(cartItems.some(item => item.id === productId))
  }, [productId, cartItems])

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
