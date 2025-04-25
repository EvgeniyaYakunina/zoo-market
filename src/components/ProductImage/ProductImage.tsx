import Image from 'next/image'
import { StaticImageData } from 'next/image'

interface ProductImageProps {
  src: string | StaticImageData
  alt: string
  width: number
  height: number
}

export const ProductImage = ({ src, alt, width, height }: ProductImageProps) => {
  return (
    <div className="relative w-[400px] h-[500px] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
        unoptimized
      />
    </div>
  )
}
