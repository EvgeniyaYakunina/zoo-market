import { useGetCardByIdQuery } from '@/app/api'
import { RootState } from '@/app/store'
import { noImage } from '@/assets'
import {
  Button,
  Loader,
  ProductDetails,
  ProductImage,
  ShareButton,
  ThumbnailSlider,
  Toast,
  ZoomableImage,
} from '@/components'
import { useCart, useErrorHandler } from '@/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { BsCart2 } from 'react-icons/bs'
import { FaArrowLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { FreeMode, Keyboard, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { Swiper as SwiperType } from 'swiper'

export const PreviewCard = () => {
  const [isCopied, setIsCopied] = useState(false)
  const router = useRouter()
  const [currentUrl, setCurrentUrl] = useState('')
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
  //const [selectedFlavor, setSelectedFlavor] = useState(0)
  const [selectedImage, setSelectedImage] = useState(cardInfo?.images?.[0] || noImage)
  const swiperRef = useRef<SwiperType | null>(null)
  // For Swiper thumbnails
  const [thumbsSwiper] = useState<SwiperType | null>(null)

  const currency = useSelector((state: RootState) => state.currency.value)
  const symbol = currency === 'BYN' ? 'Br' : '₽'

  // базовая цена в текущей валюте
  const basePrice = currency === 'BYN' ? cardInfo?.priceByn : cardInfo?.priceRub
  // скидка в процентах
  const sale = cardInfo?.sale ?? null

  // вычисляем цену со скидкой, если есть sale
  const discountedPrice =
    basePrice != null && sale != null ? +(basePrice * (1 - sale / 100)).toFixed(2) : basePrice

  // сколько экономим
  // const savedAmount =
  //   basePrice != null && discountedPrice != null ? +(basePrice -
  //   discountedPrice).toFixed(2) : null

  // Extract sizes from characteristics if they exist
  const availableSizes =
    cardInfo?.characteristics
      ?.find(char => char.some(c => c.title.toLowerCase() === 'размер'))
      ?.map(size => ({
        value: size.value,
        quantity: Number(size.additionalParams?.['количество']) || 0,
      })) || []

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const productData = {
    id: Number(id),
    image: selectedImage || noImage,
    price: discountedPrice || 0,
    originalPrice: basePrice ?? undefined,
    sale,
    title: cardInfo?.title || 'Название товара',
    description: cardInfo?.nodeDescription,
    priceByn: cardInfo?.priceByn,
    priceRub: cardInfo?.priceRub,
    availableSizes: availableSizes.length > 0 ? availableSizes : undefined,
  }

  const { isInCart, addToCart } = useCart(Number(id), productData)
  // const flavors = []

  const hasMultipleImages = cardInfo?.images && cardInfo.images.length > 1

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 3000)
  }
  const handleToast = () => setIsCopied(false)
  if (isCardLoading) {
    return <Loader />
  }
  return (
    <>
      <Toast message="Артикул скопирован" open={isCopied} onClose={handleToast} />
      <div className="px-10 py-6 flex justify-center w-full">
        <div className="w-full max-w-[1400px] flex items-start gap-8">
          {/* Левая колонка с миниатюрами и кнопкой "Назад" */}
          <div className="flex flex-col h-[500px]">
            <Link
              href="/"
              className="flex items-center gap-2 text-text-primary hover:text-text-secondary mb-2"
            >
              <FaArrowLeft className="text-xl" />
              <span>Назад</span>
            </Link>
            {hasMultipleImages && cardInfo?.images ? (
              <ThumbnailSlider
                images={cardInfo.images}
                selectedImage={selectedImage as string}
                onImageSelect={img => {
                  const idx = cardInfo.images.indexOf(img)
                  setSelectedImage(img)
                  swiperRef.current?.slideTo(idx)
                }}
              />
            ) : (
              <ProductImage
                src={cardInfo?.images?.[0] || noImage}
                alt="Корм для кошек"
                width={400}
                height={500}
              />
            )}
          </div>
          {/* Основное изображение */}
          <div className="w-[400px] h-auto shadow-md bg-bg-secondary rounded-lg overflow-hidden">
            {hasMultipleImages ? (
              <Swiper
                onSwiper={swiper => {
                  swiperRef.current = swiper
                }}
                initialSlide={cardInfo.images.findIndex(i => i === selectedImage)}
                spaceBetween={10}
                navigation
                modules={[FreeMode, Navigation, Thumbs, Keyboard]}
                thumbs={{ swiper: thumbsSwiper }}
                keyboard={{ enabled: true }}
                className="main-swiper"
                onSlideChange={swiper => setSelectedImage(cardInfo.images[swiper.activeIndex])}
              >
                {cardInfo.images.map((image, idx) => (
                  <SwiperSlide key={idx}>
                    <ZoomableImage
                      src={image}
                      alt={`Product image ${idx + 1}`}
                      width={400}
                      height={500}
                      zoomFactor={2}
                    />
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
          {/* Компонент ProductDetails */}
          <ProductDetails
            title={productData.title}
            characteristics={cardInfo?.characteristics?.flat() || []}
            onCopy={handleCopy}
            nodeId={cardInfo?.nodeId || null}
          />
          {/* Компонент ShareButton */}
          <ShareButton url={currentUrl} title={cardInfo?.title || 'Без названия'} />

          {/* Блок с ценой и корзиной */}
          <div className="flex flex-col gap-12 ml-[5%] w-[300px] h-fit shadow-lg rounded-xl p-6 bg-bg-primary border border-border-primary self-start">
            {basePrice != null ? (
              <>
                {/* Цена и старая цена */}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-accent-100">
                    {discountedPrice != null
                      ? discountedPrice.toLocaleString('ru-RU', { minimumFractionDigits: 2 })
                      : basePrice.toLocaleString('ru-RU', { minimumFractionDigits: 2 })}{' '}
                    {symbol}
                  </span>

                  {sale != null && (
                    <span className="text-sm text-gray-500 line-through">
                      {basePrice.toLocaleString('ru-RU', { minimumFractionDigits: 2 })}{' '}
                      <span className="text-text-secondary">{symbol}</span>
                    </span>
                  )}
                </div>

                {/* Кнопка в корзину */}
                {isInCart ? (
                  <Button disabled fullWidth>
                    В корзине
                  </Button>
                ) : (
                  <Button className="gap-2 text-white text-base" fullWidth onClick={addToCart}>
                    <BsCart2 /> В корзину
                  </Button>
                )}
              </>
            ) : (
              // Цена не задана
              <div className="text-lg text-text-secondary">Цена не указана</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
