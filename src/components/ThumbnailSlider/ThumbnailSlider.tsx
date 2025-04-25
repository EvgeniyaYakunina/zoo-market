import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs, Mousewheel } from 'swiper/modules'
import Image from 'next/image'

interface ThumbnailSliderProps {
  images: string[]
  selectedImage: string
  onImageSelect: (image: string) => void
}

export const ThumbnailSlider: FC<ThumbnailSliderProps> = ({
  images,
  selectedImage,
  onImageSelect,
}) => {
  return (
    <Swiper
      direction="vertical"
      spaceBetween={10}
      slidesPerView={4}
      freeMode={true}
      watchSlidesProgress={true}
      mousewheel={true}
      navigation={true}
      modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
      className="flex-1 w-16 thumbs-swiper"
    >
      {images.map((image, idx) => (
        <SwiperSlide key={idx} className="cursor-pointer" onClick={() => onImageSelect(image)}>
          <div
            className={`w-16 h-24 bg-bg-secondary shadow-md rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 ${
              selectedImage === image ? 'ring-2 ring-accent-100' : ''
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${idx + 1}`}
              width={64}
              height={96}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
