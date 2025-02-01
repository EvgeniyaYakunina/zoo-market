import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BsCart2 } from 'react-icons/bs'
import { MdOutlineStar } from 'react-icons/md'
import { Button } from '../ui'

//TODO: maybe change
type ProductItemProps = {
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
  openModal: () => void
}
export const Card = ({ product, openModal }: ProductItemProps) => {
  const { image, price, title, description, rating, id } = product
  const roundPrice = Math.floor(price)
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive(true)
    openModal()
  }

  return (
    <div className="w-[250px] p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105">
        <Link href={`/informationProduct/${id}`} className="block text-inherit">
          {/* Изображение товара */}
          <div className="relative group">
            <Image
              src={image}
              alt="product"
              width={200}
              height={200}
              className="w-full h-60 object-contain bg-gray-100"
            />
            <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-4 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Быстрый просмотр
            </span>
          </div>

          {/* Описание товара */}
          <div className="p-4">
            <b className="text-lg font-semibold">
              {roundPrice} $ <del className="text-gray-400">{roundPrice + 570}$</del>
            </b>
            <p className="text-sm text-purple-500">с кошельком</p>
            <p className="text-gray-700 text-sm">
              {title} <span className="text-gray-500">/ {description}</span>
            </p>
            <p className="flex items-center text-yellow-500 font-medium">
              <MdOutlineStar className="mr-1" /> {rating.rate}
              <span className="text-gray-500 text-sm ml-1">・{rating.count} оценок</span>
            </p>
          </div>
        </Link>

        {/* Кнопка добавления в корзину */}
        <div className="p-4">
          {isActive ? (
            <Link href="/basket">
              <Button>В корзине</Button>
            </Link>
          ) : (
            <Button fullWidth onClick={handleClick}>
              <span>
                <BsCart2 />
              </span>{' '}
              Завтра
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
