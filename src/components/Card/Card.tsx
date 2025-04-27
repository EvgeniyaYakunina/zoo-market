import Image, { StaticImageData } from 'next/image'
import { BsCart2 } from 'react-icons/bs'
import { Button } from '../ui'
import { useRouter } from 'next/router'
import { ROUTES } from '@/utils/routes'
import { noImage } from '@/assets'
import { useCart } from '@/hooks'

//TODO: maybe change
export type ProductItemProps = {
  product: {
    image: string | StaticImageData
    price: number
    title: string
    description: string
    rating?: {
      rate: number
      count: number
    }
    id: number
    priceByn: number | null
    priceRub: number | null
  }
}
export const Card = ({ product }: ProductItemProps) => {
  const { image, price, title, description, id, priceByn } = product
  const roundPrice = Math.floor(price)
  const router = useRouter()
  const { isInCart, addToCart } = useCart(id, { image, price, title, description, id })

  const handleClickCard = () => {
    router.push(`${ROUTES.CARD}/${id}`)
  }

  return (
    <div className="w-[250px] p-4">
      <div className="shadow-md rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer">
        <div onClick={handleClickCard} className="block text-inherit ">
          {/* Изображение товара */}
          <div className="relative group">
            <Image
              src={image ? image : noImage}
              alt="product"
              width={200}
              height={200}
              className="w-full h-60 object-contain bg-bg-secondary"
              unoptimized
            />
            {/* <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-accent-100 text-white text-sm px-4 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Быстрый просмотр
            </span> */}
          </div>

          {/* Описание товара */}
          <div className="p-4">
            <b className="text-lg font-semibold">
              {roundPrice}
              <span className="text-text-secondary ml-1">{priceByn ? 'Br' : '₽'}</span>

              {/* <del className="text-border-secondary">{roundPrice + 570}$</del> */}
            </b>
            <p className="text-text-primary text-sm">
              {title} <span className="text-text-secondary"> {description}</span>
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
