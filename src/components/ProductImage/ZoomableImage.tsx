import { useState } from 'react'
import Image from 'next/image'

interface ZoomableImageProps {
  src: string
  alt?: string
  width: number
  height: number
  zoomFactor?: number
}

export const ZoomableImage = ({
  src,
  alt = '',
  width,
  height,
  zoomFactor = 2,
}: ZoomableImageProps) => {
  const [hover, setHover] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{ width, height }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMouseMove}
    >
      <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} unoptimized />

      {hover && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
          style={{
            transformOrigin: `${pos.x * 100}% ${pos.y * 100}%`,
            transform: `scale(${zoomFactor})`,
          }}
        >
          <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} unoptimized />
        </div>
      )}
    </div>
  )
}
