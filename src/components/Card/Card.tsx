import Image, { StaticImageData } from 'next/image'
import { BsCart2 } from 'react-icons/bs'
import { Button } from '../ui'
import { useRouter } from 'next/router'
import { ROUTES } from '@/utils/routes'
import { noImage } from '@/assets'
import { useCart, useIsOverflow } from '@/hooks'

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
  const { image, price, title, description, id, priceRub } = product
  const roundPrice = Math.floor(price)
  const router = useRouter()
  const { isInCart, addToCart } = useCart(id, { image, price, title, description, id })
  const [titleRef, isOverflow] = useIsOverflow(title)

  const handleClickCard = () => {
    router.push(`${ROUTES.CARD}/${id}`)
  }

  return (
    <div className="w-[250px] p-4 h-[450px]">
      <div className="shadow-md rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer h-full flex flex-col justify-between">
        <div onClick={handleClickCard} className="block text-inherit ">
          {/* Изображение товара */}
          <div className="relative group">
            <Image
              src={image ? image : noImage}
              alt="product"
              width={200}
              height={200}
              className="w-full h-60 object-fill bg-bg-secondary"
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
              <span className="text-text-secondary ml-1">{priceRub ? '₽' : 'Br'}</span>

              {/* <del className="text-border-secondary">{roundPrice + 570}$</del> */}
            </b>
            <div className="relative group">
              <p
                ref={titleRef}
                className="text-text-primary text-sm h-[65px] overflow-hidden text-ellipsis line-clamp-3"
              >
                {title}
                {/* <span className="text-text-secondary"> {description}</span> */}
              </p>
              {isOverflow && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] p-2 bg-bg-secondary text-sm text-text-primary rounded-md shadow-lg opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 z-10">
                  {title}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Кнопка добавления в корзину */}
        <div className="p-4 pt-0">
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
