import Image from 'next/image'
import { BsCart2 } from 'react-icons/bs'
import { Button } from '../ui'
import { useRouter } from 'next/router'
import { ROUTES } from '@/utils/routes'
import { noImage } from '@/assets'
import { useCart, useIsOverflow } from '@/hooks'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

type Product = {
  id: number
  image: string
  price: number | null // базовая цена
  title: string
  description: string
  rating: {
    rate: number
    count: number
  }
  priceByn: number | null
  priceRub: number | null
  sale: number | null // скидка в процентах, например 70
}

type CardProps = {
  product: Product
}

export const Card = ({ product }: CardProps) => {
  const { id, image, title, description, priceByn, priceRub, sale } = product

  const currency = useSelector((s: RootState) => s.currency.value)
  const router = useRouter()

  // выбираем нужное поле цены
  const basePrice = currency === 'BYN' ? priceByn : priceRub
  const symbol = currency === 'BYN' ? 'Br' : '₽'

  // пересчёт цены при наличии скидки
  const discountedPrice =
    basePrice != null && sale != null ? +(basePrice * (1 - sale / 100)).toFixed(2) : null
  console.log(discountedPrice)
  const { isInCart, addToCart } = useCart(id, {
    image,
    price: discountedPrice ?? basePrice ?? 0,
    title,
    description,
    id,
  })
  const [titleRef, isOverflow] = useIsOverflow(title)

  const handleClickCard = () => {
    router.push(`${ROUTES.CARD}/${id}`)
  }

  return (
    <div className="w-[258px] p-4 h-[450px]">
      <div className="shadow-md rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer h-full flex flex-col justify-between">
        <div onClick={handleClickCard} className="block text-inherit">
          {/* Изображение товара */}
          <div className="relative group">
            <Image
              src={image || noImage}
              alt={title}
              width={200}
              height={200}
              className="w-full h-60 object-fill bg-bg-secondary"
              unoptimized
            />

            {/* бейдж со скидкой */}
            {sale != null && basePrice != null && (
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                -{sale}%
              </span>
            )}
          </div>

          {/* Описание товара */}
          <div className="p-4">
            {/* Цены */}
            {basePrice != null ? (
              <div className="mb-2">
                <span className="text-lg font-semibold">
                  {discountedPrice != null
                    ? discountedPrice.toLocaleString('ru-RU', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : basePrice.toLocaleString('ru-RU', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </span>
                <span className="text-text-secondary ml-1">{symbol}</span>

                {/* старая цена зачёркнута */}
                {discountedPrice != null && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {basePrice.toLocaleString('ru-RU', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    <span className="text-text-secondary">{symbol}</span>
                  </span>
                )}
              </div>
            ) : (
              <span className="inline-block text-text-secondary mb-2 text-lg">цена не указана</span>
            )}

            {/* заголовок */}
            <div className="relative group">
              <p
                ref={titleRef}
                className="text-text-primary text-sm h-[65px] overflow-hidden text-ellipsis line-clamp-3"
              >
                {title}
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
            <Button className="gap-2 text-white text-base" fullWidth onClick={addToCart}>
              <BsCart2 />В корзину
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
