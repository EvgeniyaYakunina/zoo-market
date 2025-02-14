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
import { noImage } from '@/assets'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useGetAllFiltersQuery, useGetAllNodeTypesQuery } from '@/app/api'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

const Sidebar = ({ className }: { className?: string }) => {
  const { data: allFilters } = useGetAllFiltersQuery()
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
    <aside className={`w-[20%] min-h-screen bg-bg-secondary p-4 shadow-md ${className}`}>
      <Accordion type="multiple" className="w-full">
        {allFilters?.map((filter, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b">
            <AccordionTrigger className=" group flex items-center justify-between w-full text-left py-2 px-4 text-text-primary font-medium hover:text-accent-100">
              {filter.title}
              <ChevronDownIcon
                className="transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-2 text-text-primary">
              <ul className="space-y-2">
                {filter.values.map((value, subIndex) => (
                  <li key={subIndex} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedFilters[value] || false}
                      onCheckedChange={() => handleCheckboxChange(value)}
                    />
                    <span className="cursor-pointer hover:text-blue-500">{value}</span>
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

      <div className="flex mx-8 mt-4 text-white">
        <Button className={'text-base'} onClick={applyFilters}>
          Применить фильтры
        </Button>
      </div>
    </aside>
  )
}

export const Main = () => {
  const { data: nodeTypes } = useGetAllNodeTypesQuery({ page: 1, size: 10 })
  const cards = useSelector((state: RootState) => state.cards.cards)
  console.log(cards)
  const products: ProductItemProps['product'][] = [
    {
      image: noImage,
      price: 100,
      title: 'Комбинезон 1',
      description: 'Описание комбинезона 1',
      rating: { rate: 4.5, count: 10 },
      id: 1,
    },
    {
      image: noImage,
      price: 150,
      title: 'Комбинезон 2',
      description: 'Описание комбинезона 2',
      rating: { rate: 4.2, count: 15 },
      id: 2,
    },
    {
      image: noImage,
      price: 150,
      title: 'Комбинезон 2',
      description: 'Описание комбинезона 2',
      rating: { rate: 4.2, count: 15 },
      id: 3,
    },
    {
      image: noImage,
      price: 150,
      title: 'Комбинезон 2',
      description: 'Описание комбинезона 2',
      rating: { rate: 4.2, count: 15 },
      id: 4,
    },
    {
      image: noImage,
      price: 150,
      title: 'Комбинезон 2',
      description: 'Описание комбинезона 2',
      rating: { rate: 4.2, count: 15 },
      id: 5,
    },
    {
      image: noImage,
      price: 150,
      title: 'Комбинезон 2',
      description: 'Описание комбинезона 2',
      rating: { rate: 4.2, count: 15 },
      id: 6,
    },
    {
      image: noImage,
      price: 150,
      title: 'Комбинезон 2',
      description: 'Описание комбинезона 2',
      rating: { rate: 4.2, count: 15 },
      id: 7,
    },
  ]
  console.log(nodeTypes)
  return (
    <div className="flex flex-col w-full">
      <Tabs onValueChange={value => console.log(value)}>
        <div className="w-full bg-border-secondary shadow-md">
          <TabsList className="flex flex-wrap gap-4 py-2 px-4 mx-auto">
            {nodeTypes?.items.map(nodeType => (
              <TabsTrigger
                key={nodeType.id}
                value={nodeType.type}
                className="text-white text-xl font-bold hover:text-accent-100 whitespace-nowrap"
              >
                {nodeType.type}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Основной контейнер с сайдбаром и контентом */}
        <div className="flex w-full min-h-screen">
          <Sidebar />

          <div className="w-[80%] p-4">
            {nodeTypes?.items.map(nodeType => (
              <TabsContent key={nodeType.id} value={nodeType.type}>
                <h2 className="text-2xl font-bold text-center mb-4">{nodeType.type}</h2>
                <div className="flex flex-wrap justify-center">
                  {products.map(product => (
                    <Card key={product.id} product={product} />
                  ))}
                  {/*{cards*/}
                  {/*    .filter(card => card.nodeType === nodeType.type)*/}
                  {/*    .map(card => (*/}
                  {/*        <Card key={card.nodeId} product={{*/}
                  {/*          image: card.images[0] || noImage,*/}
                  {/*          price: 100,*/}
                  {/*          title: card.title,*/}
                  {/*          description: card.nodeTypeDescription || '',*/}
                  {/*          rating: { rate: 4.5, count: 10 },*/}
                  {/*          id: card.nodeId,*/}
                  {/*        }} />*/}
                  {/*    ))}*/}
                </div>
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  )
}
