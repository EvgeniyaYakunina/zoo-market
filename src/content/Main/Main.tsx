import { Button, Card, Checkbox, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { useState } from 'react'
import { noImage } from '@/assets'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { CardItem, useGetAllFiltersQuery, useGetAllNodeTypesQuery } from '@/app/api'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store/store'

type SidebarProps = {
  className?: string
  onApplyFilters: (filters: string[]) => void
}

const Sidebar = ({ className, onApplyFilters }: SidebarProps) => {
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
    onApplyFilters(selected)
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
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const handleApplyFilters = (filters: string[]) => {
    setSelectedFilters(filters)
  }
  console.log(cards)
  console.log(nodeTypes)

  const filterCards = (cards: CardItem[], filters: string[]) => {
    if (filters.length === 0) return cards

    return cards.filter(card => {
      return card.characteristics.some(characteristicGroup =>
        characteristicGroup.some(characteristic => filters.includes(characteristic.value))
      )
    })
  }

  const defaultTabValue = nodeTypes?.items[0]?.type || ''

  return (
    <div className="flex flex-col w-full">
      <Tabs defaultValue={defaultTabValue}>
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
          <Sidebar onApplyFilters={handleApplyFilters} />

          <div className="w-[80%] p-4">
            {nodeTypes?.items.map(nodeType => (
              <TabsContent key={nodeType.id} value={nodeType.type}>
                <h2 className="text-2xl font-bold text-center mb-4">{nodeType.type}</h2>
                <div className="flex flex-wrap justify-center">
                  {filterCards(
                    cards.filter(card => card.nodeType === nodeType.type),
                    selectedFilters
                  ).map(card => (
                    <Card
                      key={card.nodeId}
                      product={{
                        image: card.images[0] || noImage,
                        price: 100,
                        title: card.title,
                        description: card.nodeDescription || '',
                        rating: { rate: 4.5, count: 10 },
                        id: card.nodeId,
                      }}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  )
}
