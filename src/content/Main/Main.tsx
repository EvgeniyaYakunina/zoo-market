import { useGetAllCardsQuery, useGetAllFiltersQuery, useGetAllNodeTypesQuery } from '@/app/api'
import { noImage } from '@/assets'
import {
  Button,
  Card,
  Checkbox,
  Loader,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components'
import { useErrorHandler } from '@/hooks'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

type SidebarProps = {
  className?: string
  onApplyFilters: (filters: Record<string, string>) => void
}

const Sidebar = ({ className, onApplyFilters }: SidebarProps) => {
  const {
    data: allFilters,
    error: filterError,
    isLoading: isLoadingFilters,
  } = useGetAllFiltersQuery()
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({})
  const handleError = useErrorHandler()

  useEffect(() => {
    if (filterError) {
      handleError(filterError)
    }
  }, [filterError])

  const handleCheckboxChange = (filterTitle: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterTitle]: prev[filterTitle] === value ? '' : value,
    }))
  }

  const applyFilters = () => {
    const applied = Object.keys(selectedFilters).reduce(
      (acc, key) => {
        if (selectedFilters[key]) acc[key] = selectedFilters[key]
        return acc
      },
      {} as Record<string, string>
    )
    console.log('Применяем фильтры:', applied)
    onApplyFilters(applied)
  }

  if (isLoadingFilters) return <Loader />

  return (
    <aside className={`w-[20%] min-h-screen bg-bg-secondary p-4 shadow-md ${className}`}>
      <Accordion type="multiple" className="w-full">
        {allFilters?.map((filter, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b">
            <AccordionTrigger className="group flex items-center justify-between w-full text-left py-2 px-4 text-text-primary font-medium hover:text-accent-100">
              {filter.title}
              <ChevronDownIcon
                className="transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-2 text-text-primary">
              {filter.title.toLowerCase() === 'скидка' && filter.values.length === 0 ? (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedFilters['Скидка'] === 'true'}
                    onCheckedChange={() =>
                      handleCheckboxChange(
                        'Скидка',
                        selectedFilters['Скидка'] === 'true' ? '' : 'true'
                      )
                    }
                  />
                  <span className="cursor-pointer hover:text-blue-500">Скидка</span>
                </div>
              ) : (
                <ul className="space-y-2">
                  {filter.values.map((value, subIndex) => (
                    <li key={subIndex} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedFilters[filter.title] === value}
                        onCheckedChange={() => handleCheckboxChange(filter.title, value)}
                      />
                      <span className="cursor-pointer hover:text-blue-500">{value}</span>
                    </li>
                  ))}
                </ul>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex mx-8 mt-4 text-white">
        <Button className="text-base" onClick={applyFilters}>
          Применить фильтры
        </Button>
      </div>
    </aside>
  )
}

export const Main = () => {
  const {
    data: nodeTypes,
    isLoading: isLoadingNodeTypes,
    error: nodeTypesError,
  } = useGetAllNodeTypesQuery({ page: 1, size: 10 })
  const [selectedNodeTypeId, setSelectedNodeTypeId] = useState<number | null>(null)
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<Record<string, string>>({})
  const [filtersApplied, setFiltersApplied] = useState(false)

  const handleError = useErrorHandler()
  const searchResults = useSelector((state: RootState) => state.search.results)

  useEffect(() => {
    if (nodeTypesError) {
      handleError(nodeTypesError)
    }
  }, [nodeTypesError])

  useEffect(() => {
    const resetHandler = () => {
      setSelectedNodeTypeId(null)
      setSelectedCharacteristics({})
      setFiltersApplied(false)
    }
    window.addEventListener('resetFilters', resetHandler)
    return () => window.removeEventListener('resetFilters', resetHandler)
  }, [])

  const {
    data: cardsData,
    isLoading: isLoadingCards,
    isFetching,
    error: cardsError,
  } = useGetAllCardsQuery(
    {
      pageNumber: 1,
      pageSize: 50,
      nodeTypeId: selectedNodeTypeId !== null ? selectedNodeTypeId : undefined,
      filters: selectedCharacteristics,
    },
    { refetchOnMountOrArgChange: true }
  )

  const handleApplyFilters = (filters: Record<string, string>) => {
    setSelectedCharacteristics(filters)
    setFiltersApplied(Object.keys(filters).length > 0)
  }

  const renderContent = () => {
    // Если есть ошибка при загрузке карточек
    if (cardsError) {
      return (
        <div className="flex items-center justify-center w-full h-[calc(100vh-200px)] pl-[500px]">
          <div className="text-4xl font-semibold text-text-primary">Товары не найдены</div>
        </div>
      )
    }

    // Если есть результаты поиска - показываем их
    if (searchResults && searchResults.length > 0) {
      return (
        <div className="flex flex-wrap justify-center">
          {searchResults.map(card => (
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
      )
    }

    if (isLoadingCards || isFetching) {
      return <Loader />
    }

    // Если были применены фильтры (характеристики или nodeTypeId)
    const hasFilters = filtersApplied || selectedNodeTypeId !== null

    // Если есть фильтры и нет товаров
    if (hasFilters && (!cardsData?.items || cardsData.items.length === 0)) {
      return (
        <div className="flex items-center justify-center w-full h-[calc(100vh-200px)]">
          <div className="text-4xl font-semibold text-text-primary">Товары не найдены</div>
        </div>
      )
    }

    // Если есть товары
    if (cardsData?.items && cardsData.items.length > 0) {
      return (
        <div className="flex flex-wrap justify-center">
          {cardsData.items.map(card => (
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
      )
    }

    // Дефолтный случай (без фильтров и без товаров)
    return (
      <div className="flex items-center justify-center pl-[100px] w-full h-[calc(100vh-200px)]">
        <div className="text-4xl font-semibold text-text-primary ">Товары не найдены</div>
      </div>
    )
  }

  if (isLoadingNodeTypes) return <Loader />

  return (
    <div className="flex flex-col w-full">
      <Tabs
        defaultValue={selectedNodeTypeId !== null ? selectedNodeTypeId.toString() : 'all'}
        value={selectedNodeTypeId !== null ? selectedNodeTypeId.toString() : 'all'}
      >
        <div className="w-full bg-border-secondary shadow-md">
          <TabsList className="flex flex-wrap gap-4 py-2 px-4 mx-auto">
            {nodeTypes?.items.map(nt => (
              <TabsTrigger
                key={nt.id}
                value={nt.id.toString()}
                onClick={() => {
                  setSelectedNodeTypeId(nt.id)
                  setFiltersApplied(false)
                }}
                className="text-white text-xl font-bold hover:text-accent-100 whitespace-nowrap"
              >
                {nt.type}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex w-full min-h-screen">
          <Sidebar onApplyFilters={handleApplyFilters} />

          <TabsContent value={selectedNodeTypeId !== null ? selectedNodeTypeId.toString() : 'all'}>
            <div className="flex flex-col w-full p-4">{renderContent()}</div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
