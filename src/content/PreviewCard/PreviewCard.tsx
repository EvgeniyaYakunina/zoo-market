import { useGetCardByIdQuery } from '@/app/api'
import { noImage } from '@/assets'
import { Button, Loader } from '@/components'
import { useCart, useErrorHandler } from '@/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsCart2 } from 'react-icons/bs'
import { FaArrowLeft } from 'react-icons/fa'
// Import Swiper and modules
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs, Mousewheel, Keyboard } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/mousewheel'
import 'swiper/css/keyboard'
import type { Swiper as SwiperType } from 'swiper'

export const PreviewCard = () => {
  const router = useRouter()
  const { id } = router.query
  const handleError = useErrorHandler()
  const {
    data: cardInfo,
    isLoading: isCardLoading,
    error: cardError,
  } = useGetCardByIdQuery(Number(id), {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })
  const [selectedFlavor, setSelectedFlavor] = useState(0)
  const [selectedImage, setSelectedImage] = useState(cardInfo?.images?.[0] || noImage)
  // For Swiper thumbnails
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

  useEffect(() => {
    if (cardError) {
      handleError(cardError)
    }
  }, [cardError])
  useEffect(() => {
    if (cardInfo?.images?.length) {
      setSelectedImage(cardInfo.images[0])
    }
  }, [cardInfo?.images])

  const productData = {
    id: Number(id),
    image: selectedImage || noImage,
    price:
      cardInfo?.priceRub !== null
        ? cardInfo?.priceRub
        : cardInfo?.priceByn !== null
          ? cardInfo?.priceByn
          : 0,
    title: cardInfo?.title || 'Название товара',
    description: cardInfo?.nodeDescription,
  }
  console.log('cardInfo', cardInfo)
  const { isInCart, addToCart } = useCart(Number(id), productData)
  const flavors = ['Курица', 'Говядина', 'Рыба', 'Индейка', 'Утка', 'Лосось']

  const hasMultipleImages = cardInfo?.images && cardInfo.images.length > 1

  if (isCardLoading) {
    return <Loader />
  }
  return (
    <div className="px-10 py-6 flex justify-center w-full">
      <div className="w-full max-w-[1400px] flex items-start gap-8">
        {/* Левая колонка с миниатюрами и кнопкой "Назад" */}
        <div className="flex flex-col gap-4 h-[500px]">
          <Link
            href="/"
            className="flex items-center gap-2 text-text-primary hover:text-text-secondary mb-4"
          >
            <FaArrowLeft className="text-xl" />
            <span>Назад</span>
          </Link>
          {hasMultipleImages ? (
            <Swiper
              onSwiper={setThumbsSwiper}
              direction="vertical"
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              mousewheel={true}
              modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
              className="h-[400px] w-16 thumbs-swiper"
            >
              {cardInfo.images.map((image, idx) => (
                <SwiperSlide key={idx} className="cursor-pointer">
                  <div
                    className={`w-16 h-24 bg-bg-secondary shadow-md rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 ${
                      selectedImage === image ? 'ring-2 ring-accent-100' : ''
                    }`}
                  >
                    <Image
                      src={image || noImage}
                      alt={`Thumbnail ${idx + 1}`}
                      width={64}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="w-16 h-24">
              <Image
                src={cardInfo?.images?.[0] || noImage}
                alt={'no image'}
                width={64}
                height={96}
                className="object-cover"
              />
            </div>
          )}
        </div>
        {/* Основное изображение */}
        <div className="w-[400px] h-auto shadow-md bg-bg-secondary rounded-lg overflow-hidden">
          {hasMultipleImages ? (
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[FreeMode, Navigation, Thumbs, Keyboard]}
              keyboard={{ enabled: true }}
              className="main-swiper"
              onSlideChange={swiper => setSelectedImage(cardInfo.images[swiper.activeIndex])}
            >
              {cardInfo.images.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <div className="w-[400px] h-[500px] flex justify-center items-center">
                    <Image
                      src={image || noImage}
                      alt={`Product image ${idx + 1}`}
                      width={400}
                      height={500}
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="w-[400px] h-[500px] flex justify-center items-center">
              <Image
                src={cardInfo?.images?.[0] || noImage}
                alt="Корм для кошек"
                width={400}
                height={500}
                className="object-cover"
              />
            </div>
          )}
        </div>
        {/* Правая колонка с описанием */}
        <div className="flex flex-col w-auto">
          {/* Заголовок */}
          <h1 className="text-2xl font-semibold text-text-primary mb-1">{cardInfo?.title}</h1>
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
            {cardInfo?.characteristics && cardInfo.characteristics.length > 0 && (
              <div className="mt-5">
                <h3 className="mb-2 text-text-secondary">Характеристики:</h3>
                <ul className="text-text-primary space-y-2">
                  {cardInfo.characteristics.flat().map((char, index) => (
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
          </div>
        </div>
        {/* Блок с ценой и корзиной */}
        <div className="w-[280px] h-fit shadow-lg rounded-xl p-6 bg-bg-primary border border-border-primary self-start">
          {/* Цена */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-accent-100">
              {productData.price !== undefined && productData.price > 0
                ? `${productData.price} ${cardInfo?.priceRub !== null ? '₽' : 'Br'}`
                : 'цена не указана'}
            </span>
          </div>
          {/* Скидка */}
          <div className="flex items-center bg-discount/10 text-discount rounded-lg px-4 py-2 mt-4 text-lg font-semibold mb-[25px]"></div>
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
