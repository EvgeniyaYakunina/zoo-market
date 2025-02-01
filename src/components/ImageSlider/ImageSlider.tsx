import { JSX, useEffect, useState } from 'react'

interface ImageSliderProps {
  slides: string[]
  leftArrow: JSX.Element
  rightArrow: JSX.Element
}

const ImageSlider = ({ slides, leftArrow, rightArrow }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToPrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1))
      setIsAnimating(false)
    }, 400)
  }

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1))
      setIsAnimating(false)
    }, 400)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 10000)
    return () => clearInterval(interval)
  }, [currentIndex, slides.length])

  return (
    <div className="relative max-w-screen-lg mx-auto p-4">
      {/* Стрелки */}
      <div className="absolute inset-0 flex justify-between items-center opacity-0 hover:opacity-100 transition">
        <button className="p-2 bg-gray-200 rounded-full" onClick={goToPrevious}>
          {leftArrow}
        </button>
        <button className="p-2 bg-gray-200 rounded-full" onClick={goToNext}>
          {rightArrow}
        </button>
      </div>

      {/* Слайд */}
      <div
        className="w-full h-64 md:h-80 lg:h-96 bg-center bg-cover rounded-lg transition-opacity duration-300"
        style={{ backgroundImage: `url(${slides[currentIndex]})` }}
      ></div>

      {/* Точки */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-500'}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
