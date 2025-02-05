import { royal_canin } from '@/assets'
import { Button } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaArrowLeft, FaLongArrowAltDown } from 'react-icons/fa'

export const PreviewCard = () => {
  const [selectedFlavor, setSelectedFlavor] = useState(0)

  const flavors = ['Курица', 'Говядина', 'Рыба', 'Индейка', 'Утка', 'Лосось']

  return (
    <div className="px-10 py-6 flex justify-center w-full">
      <div className="w-full max-w-[1400px] flex items-start gap-8">
        {/* Левая колонка с миниатюрами и кнопкой "Назад" */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-text-primary hover:text-text-secondary mb-4"
          >
            <FaArrowLeft className="text-xl" />
            <span>Назад</span>
          </Link>

          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="w-16 h-24 bg-bg-secondary rounded-lg overflow-hidden">
              <Image
                src={royal_canin || '/placeholder.svg'}
                alt={`Thumbnail ${idx + 1}`}
                width={64}
                height={96}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Основное изображение */}
        <div className="w-[400px] h-auto bg-bg-secondary rounded-lg overflow-hidden flex justify-center items-center">
          <Image
            src={royal_canin || '/placeholder.svg'}
            alt="Корм для кошек"
            width={400}
            height={500}
            className="object-cover"
          />
        </div>

        {/* Правая колонка с описанием */}
        <div className="flex flex-col w-auto">
          {/* Заголовок */}
          <h1 className="text-2xl font-semibold text-text-primary mb-1">
            Корм для кошек Royal Canin, 2 кг
          </h1>

          {/* Варианты вкусов */}
          <div className="mt-5">
            <h3 className="mb-2 text-text-secondary">Вкус: {flavors[selectedFlavor]}</h3>
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
                    src={royal_canin || '/placeholder.svg'}
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
            <ul className="text-text-muted space-y-2">
              <li>Артикул</li>
              <li>Тип корма</li>
              <li>Возраст</li>
              <li>Вес упаковки</li>
              <li>Страна производства</li>
              <li>Срок годности</li>
            </ul>
            <ul className="ml-8 space-y-2 text-text-primary">
              <li>RC-564892</li>
              <li>Сухой</li>
              <li>Взрослые кошки (1-7 лет)</li>
              <li>2 кг</li>
              <li>Франция</li>
              <li>18 месяцев</li>
            </ul>
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
          <Button fullWidth onClick={() => alert('add to cart')}>
            Добавить в корзину
          </Button>
        </div>
      </div>
    </div>
  )
}
