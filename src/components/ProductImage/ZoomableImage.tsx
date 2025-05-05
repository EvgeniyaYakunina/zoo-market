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
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setPos({ x, y })
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{ width, height }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
        unoptimized
      />

      {hover && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            height,
            pointerEvents: 'none',
            transformOrigin: `${pos.x * 100}% ${pos.y * 100}%`,
            transform: `scale(${zoomFactor})`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-cover"
            unoptimized
          />
        </div>
      )}
    </div>
  )
}
