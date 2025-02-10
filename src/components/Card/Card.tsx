import Image, { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import { BsCart2 } from 'react-icons/bs'
import { Button } from '../ui'
import { useRouter } from 'next/router'
import { ROUTES } from '@/utils/routes'
import { CartItem } from '@/components'

//TODO: maybe change
export type ProductItemProps = {
  product: {
    image: string | StaticImageData
    price: number
    title: string
    description: string
    rating: {
      rate: number
      count: number
    }
    id: number
  }
}
export const Card = ({ product }: ProductItemProps) => {
  const { image, price, title, description } = product
  const roundPrice = Math.floor(price)
  const router = useRouter()
  const [isInCart, setIsInCart] = useState(false)

  // Проверяем, есть ли товар в корзине при загрузке
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
    setIsInCart(cartItems.some((item: CartItem) => item.id === product.id))
  }, [product.id])

  const addToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const productToAdd = {
      id: product.id,
      image: product.image,
      price: product.price,
      title: product.title,
      description: product.description,
      rating: product.rating,
      quantity: 1,
    }

    if (!storedCart.some((item: CartItem) => item.id === productToAdd.id)) {
      const updatedCart = [...storedCart, productToAdd]
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      setIsInCart(true)
      window.dispatchEvent(new Event('cartUpdated')) // Обновляем Header
    }
  }

  const handleClickCard = () => {
    // router.push(`ROUTES.CARD/${id}`)
    router.push(ROUTES.CARD)
  }

  return (
    <div className="w-[250px] p-4">
      <div className="shadow-md rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105">
        <div onClick={handleClickCard} className="block text-inherit ">
          {/* Изображение товара */}
          <div className="relative group">
            <Image
              src={image}
              alt="product"
              width={200}
              height={200}
              className="w-full h-60 object-contain bg-bg-secondary"
            />
            <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-accent-100 text-white text-sm px-4 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Быстрый просмотр
            </span>
          </div>

          {/* Описание товара */}
          <div className="p-4">
            <b className="text-lg font-semibold">
              {roundPrice} $ <del className="text-border-secondary">{roundPrice + 570}$</del>
            </b>
            <p className="text-text-primary text-sm">
              {title} <span className="text-text-secondary">/ {description}</span>
            </p>
          </div>
        </div>

        {/* Кнопка добавления в корзину */}
        <div className="p-4">
          {isInCart ? (
            <Button disabled fullWidth>
              В корзине
            </Button>
          ) : (
            <Button className={'gap-2 text-white text-base'} fullWidth onClick={addToCart}>
              <span>
                <BsCart2 />
              </span>{' '}
              В корзину
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
