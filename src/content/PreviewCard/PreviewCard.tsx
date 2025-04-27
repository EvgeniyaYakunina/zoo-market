import { useGetCardByIdQuery } from '@/app/api'
import { noImage } from '@/assets'
import {
  Button,
  Loader,
  ProductDetails,
  ProductImage,
  ShareButton,
  ThumbnailSlider,
  Toast,
} from '@/components'
import { useCart, useErrorHandler } from '@/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { BsCart2 } from 'react-icons/bs'
import { FaArrowLeft } from 'react-icons/fa'
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

  const [showMag, setShowMag] = useState(false)
  const [magPos, setMagPos] = useState({ x: 0, y: 0, width: 0, height: 0 })
  // размеры лупы в px
  const MAG_SIZE = 400
  // коэффициент увеличения
  const ZOOM = 2
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
                    <div
                      className="relative w-[400px] h-[500px] overflow-hidden"
                      onMouseMove={e => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const x = e.clientX - rect.left
                        const y = e.clientY - rect.top
                        setMagPos({ x, y, width: rect.width, height: rect.height })
                        setShowMag(true)
                      }}
                      onMouseLeave={() => setShowMag(false)}
                    >
                      <Image
                        src={image}
                        alt={`Product image ${idx + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />

                      {showMag && (
                        <div
                          style={{
                            position: 'absolute',
                            pointerEvents: 'none',
                            top: magPos.y - MAG_SIZE / 2,
                            left: magPos.x - MAG_SIZE / 2,
                            width: MAG_SIZE,
                            height: MAG_SIZE,
                            border: '2px solid rgba(255,255,255,0.8)',
                            borderRadius: '50%',
                            backgroundImage: `url(${image})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: `${magPos.width * ZOOM}px ${magPos.height * ZOOM}px`,
                            backgroundPosition: `-${magPos.x * ZOOM - MAG_SIZE / 2}px -${magPos.y * ZOOM - MAG_SIZE / 2}px`,
                          }}
                        />
                      )}
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
          {/* Компонент ProductDetails */}
          <ProductDetails
            title={cardInfo?.title || 'Название товара'}
            characteristics={cardInfo?.characteristics?.flat() || []}
            onCopy={handleCopy}
            nodeId={cardInfo?.nodeId || null}
          />
          {/* Компонент ShareButton */}
          <ShareButton url={currentUrl} title={cardInfo?.title || 'Без названия'} />
          {/* Блок с ценой и корзиной */}
          <div className="ml-20 w-[280px] h-fit shadow-lg rounded-xl p-6 bg-bg-primary border border-border-primary self-start">
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
    </>
  )
}
