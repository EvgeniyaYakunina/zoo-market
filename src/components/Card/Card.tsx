import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import { BsCart2 } from 'react-icons/bs'
import { Button } from '../ui'
import { useRouter } from 'next/router'
import { ROUTES } from '@/utils/routes'

//TODO: maybe change
export type ProductItemProps = {
  product: {
    image: StaticImageData
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
  const [isActive, setIsActive] = useState(false)
  const router = useRouter()
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
              className="w-full h-60 object-contain bg-gray-100"
            />
            <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-accent-100 text-white text-sm px-4 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Быстрый просмотр
            </span>
          </div>

          {/* Описание товара */}
          <div className="p-4">
            <b className="text-lg font-semibold">
              {roundPrice} $ <del className="text-gray-400">{roundPrice + 570}$</del>
            </b>
            <p className="text-gray-700 text-sm">
              {title} <span className="text-gray-500">/ {description}</span>
            </p>
          </div>
        </div>

        {/* Кнопка добавления в корзину */}
        <div className="p-4">
          {isActive ? (
            <Button onClick={() => setIsActive}>В корзине</Button>
          ) : (
            <Button className={'gap-2 text-white'} fullWidth>
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
