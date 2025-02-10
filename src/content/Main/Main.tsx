import {
  Button,
  Card,
  Checkbox,
  ProductItemProps,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { useState } from 'react'
import { royal_canin } from '@/assets'
import { ChevronDownIcon } from '@radix-ui/react-icons'

const categories = [
  { name: 'Категория 1', subcategories: ['Подкатегория 1', 'Подкатегория 2', 'Подкатегория 3'] },
  { name: 'Категория 2', subcategories: ['Подкатегория 1', 'Подкатегория 2'] },
  { name: 'Категория 3', subcategories: ['Подкатегория 1', 'Подкатегория 2', 'Подкатегория 3'] },
  { name: 'Категория 4', subcategories: ['Подкатегория 1'] },
  { name: 'Категория 5', subcategories: ['Подкатегория 1', 'Подкатегория 2'] },
]

const Sidebar = ({ className }: { className?: string }) => {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: boolean }>({})

  const handleCheckboxChange = (filterKey: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }))
  }

  const applyFilters = () => {
    const selected = Object.keys(selectedFilters).filter(key => selectedFilters[key])
    console.log('Выбранные фильтры:', selected)
  }

  return (
    <aside className={`w-[20%] min-h-screen bg-gray-100 p-4 shadow-md ${className}`}>
      <Accordion type="multiple" className="w-full">
        {categories.map((category, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b">
            <AccordionTrigger className=" group flex items-center justify-between w-full text-left py-2 px-4 font-medium hover:text-accent-100">
              {category.name}
              <ChevronDownIcon
                className="transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-2 text-gray-700">
              <ul className="space-y-2">
                {category.subcategories.map((subcategory, subIndex) => (
                  <li key={subIndex} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedFilters[subcategory] || false}
                      onCheckedChange={() => handleCheckboxChange(subcategory)}
                    />
                    <span className="cursor-pointer hover:text-blue-500">{subcategory}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          checked={selectedFilters['Скидка'] || false}
          onCheckedChange={() => handleCheckboxChange('Скидка')}
        />
        <span className="cursor-pointer hover:text-blue-500">Скидка</span>
      </div>

      <div className="flex mx-6 mt-4 text-white">
        <Button onClick={applyFilters}>Применить фильтры</Button>
      </div>
    </aside>
  )
}

export const Main = () => {
  const products: ProductItemProps['product'][] = [
    {
      image: royal_canin || '',
      price: 100,
      title: 'Комбинезон 1',
      description: 'Описание комбинезона 1',
      rating: { rate: 4.5, count: 10 },
      id: 1,
    },
    {
      image: royal_canin,
      price: 150,
      title: 'Комбинезон 2',
      description: 'Описание комбинезона 2',
      rating: { rate: 4.2, count: 15 },
      id: 2,
    },
    {
      image: royal_canin,
      price: 150,
      title: 'Комбинезон 2',
      description: 'Описание комбинезона 2',
      rating: { rate: 4.2, count: 15 },
      id: 3,
    },
    {
      image: royal_canin,
      price: 150,
      title: 'Комбинезон 2',
      description: 'Описание комбинезона 2',
      rating: { rate: 4.2, count: 15 },
      id: 4,
    },
    {
      image: royal_canin,
      price: 150,
      title: 'Комбинезон 2',
      description: 'Описание комбинезона 2',
      rating: { rate: 4.2, count: 15 },
      id: 5,
    },
    {
      image: royal_canin,
      price: 150,
      title: 'Комбинезон 2',
      description: 'Описание комбинезона 2',
      rating: { rate: 4.2, count: 15 },
      id: 6,
    },
    {
      image: royal_canin,
      price: 150,
      title: 'Комбинезон 2',
      description: 'Описание комбинезона 2',
      rating: { rate: 4.2, count: 15 },
      id: 7,
    },
  ]

  return (
    <div className="flex flex-col w-full">
      <Tabs onValueChange={value => console.log(value)}>
        <div className="w-full bg-gray-300 shadow-md">
          <TabsList className="flex gap-4 py-2 max-w-4xl mx-auto">
            <TabsTrigger
              value="tab1"
              className="text-white text-xl font-bold hover:text-accent-100"
            >
              Комбинезоны
            </TabsTrigger>
            <TabsTrigger
              value="tab2"
              className="text-white text-xl font-bold hover:text-accent-100"
            >
              Майки
            </TabsTrigger>
            <TabsTrigger
              value="tab3"
              className="text-white text-xl font-bold hover:ttext-accent-100"
            >
              Повязки
            </TabsTrigger>
            <TabsTrigger
              value="tab4"
              className="text-white text-xl font-bold hover:text-accent-100"
            >
              Ботинки
            </TabsTrigger>
            <TabsTrigger
              value="tab5"
              className="text-white text-xl font-bold hover:text-accent-100"
            >
              Жилеты
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Основной контейнер с сайдбаром и контентом */}
        <div className="flex w-full min-h-screen">
          <Sidebar />

          <div className="w-[80%] p-4">
            <TabsContent value="tab1">
              <h2 className="text-2xl font-bold text-center mb-4">Комбинезоны</h2>
              <div className="flex flex-wrap justify-center">
                {products.map(product => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <h2 className="text-2xl font-bold text-center mb-4">Майки</h2>
            </TabsContent>
            <TabsContent value="tab3">
              <h2 className="text-2xl font-bold text-center mb-4">Повязки</h2>
            </TabsContent>
            <TabsContent value="tab4">
              <h2 className="text-2xl font-bold text-center mb-4">Ботинки</h2>
            </TabsContent>
            <TabsContent value="tab5">
              <h2 className="text-2xl font-bold text-center mb-4">Жилеты</h2>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
