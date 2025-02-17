import { noImage } from '@/assets'
import { Button } from '@/components'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaLongArrowAltDown } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useGetCardByIdQuery } from '@/app/api'
import { BsCart2 } from 'react-icons/bs'

type PreviewCardProps = {
  addToCart: () => void
  isInCart: boolean
}
export const PreviewCard = ({ addToCart, isInCart }: PreviewCardProps) => {
  const router = useRouter()
  const { id } = router.query
  const { data: card } = useGetCardByIdQuery(Number(id), { skip: !id })
  const [selectedFlavor, setSelectedFlavor] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | StaticImageData>(noImage)

  useEffect(() => {
    if (card?.images?.length) {
      setSelectedImage(card.images[0])
    }
  }, [card?.images])

  const flavors = ['Курица', 'Говядина', 'Рыба', 'Индейка', 'Утка', 'Лосось']
  return (
    <div className="px-10 py-6 flex justify-center w-full">
      <div className="w-full max-w-[1400px] flex items-start gap-8">
        {/* Левая колонка с миниатюрами и кнопкой "Назад" */}
        <div className="flex flex-col gap-4 ">
          <Link
            href="/"
            className="flex items-center gap-2 text-text-primary hover:text-text-secondary mb-4"
          >
            <FaArrowLeft className="text-xl" />
            <span>Назад</span>
          </Link>
          {card?.images ? (
            card.images.length > 0 &&
            card.images.map((image, idx) => (
              <div
                key={idx}
                className={`w-16 h-24 bg-bg-secondary shadow-md rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer ${
                  selectedImage === image ? 'ring-2 ring-accent-100' : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image || noImage}
                  alt={`Thumbnail ${idx + 1}`}
                  width={64}
                  height={96}
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            <Image src={noImage} alt={'no image'} width={64} height={96} className="object-cover" />
          )}
        </div>
        {/* Основное изображение */}
        <div className="w-[400px] h-auto shadow-md bg-bg-secondary rounded-lg overflow-hidden flex justify-center items-center">
          <Image
            src={selectedImage}
            alt="Корм для кошек"
            width={400}
            height={500}
            className="object-cover"
          />
        </div>
        {/* Правая колонка с описанием */}
        <div className="flex flex-col w-auto">
          {/* Заголовок */}
          <h1 className="text-2xl font-semibold text-text-primary mb-1">{card?.title}</h1>
          {/* Варианты вкусов */}
          <div className="mt-5">
            <h3 className="mb-2 text-text-secondary">Вариант: {flavors[selectedFlavor]}</h3>
            <div className="flex gap-2 flex-wrap">
              {flavors.map((flavor, idx) => (
                <div
                  key={idx}
                  className={`w-14 h-16 bg-bg-secondary rounded-lg overflow-hidden cursor-pointer ${
                    selectedFlavor === idx ? 'ring-2 ring-accent-100' : ''
                  }`}
                  onClick={() => setSelectedFlavor(idx)}
                >
                  <Image
                    src={noImage || '/placeholder.svg'}
                    alt={`Flavor variant ${flavor}`}
                    width={56}
                    height={64}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Характеристики */}
          <div className="mt-5 flex text-lg">
            {card?.characteristics && card.characteristics.length > 0 && (
              <div className="mt-5">
                <h3 className="mb-2 text-text-secondary">Характеристики:</h3>
                <ul className="text-text-primary space-y-2">
                  {card.characteristics.flat().map((char, index) => (
                    <li key={index} className="p-2 border border-bg-secondary rounded-md">
                      <strong className="text-text-primary">{char.title}:</strong> {char.value}
                      {char.description && (
                        <p className="text-text-secondary text-sm mt-1">{char.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/*<ul className="text-text-muted space-y-2">*/}
            {/*  <li>Артикул</li>*/}
            {/*  <li>Тип корма</li>*/}
            {/*  <li>Возраст</li>*/}
            {/*  <li>Вес упаковки</li>*/}
            {/*  <li>Страна производства</li>*/}
            {/*  <li>Срок годности</li>*/}
            {/*</ul>*/}
            {/*<ul className="ml-8 space-y-2 text-text-primary">*/}
            {/*  <li>RC-564892</li>*/}
            {/*  <li>Сухой</li>*/}
            {/*  <li>Взрослые кошки (1-7 лет)</li>*/}
            {/*  <li>2 кг</li>*/}
            {/*  <li>Франция</li>*/}
            {/*  <li>18 месяцев</li>*/}
            {/*</ul>*/}
          </div>
        </div>
        {/* Блок с ценой и корзиной */}
        <div className="w-[280px] h-fit shadow-lg rounded-xl p-6 bg-bg-primary border border-border-primary self-start">
          {/* Цена */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-accent-100">250₽</span>
            <span className="text-xl text-text-secondary">300₽</span>
            <span className="text-text-muted line-through">450₽</span>
          </div>
          {/* Скидка */}
          <div className="flex items-center bg-discount/10 text-discount rounded-lg px-4 py-2 mt-4 text-lg font-semibold mb-[25px]">
            <FaLongArrowAltDown className="mr-2" />
            <div className="flex items-center gap-5">
              <span>50₽</span>
              <span>скидка</span>
            </div>
          </div>
          {/* Кнопка в корзину */}
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
