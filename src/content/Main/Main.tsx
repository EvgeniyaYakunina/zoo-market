import {
  CardItem,
  useGetAllCardsQuery,
  useGetAllFiltersQuery,
  useGetAllNodeTypesQuery,
} from '@/app/api'
import { RootState } from '@/app/store'
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
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

type Filter = {
  characteristicId: number
  title: string
  values: string[]
}

type SidebarProps = {
  className?: string
  onApplyFilters: (filters: Record<string, string[]>) => void
  filters?: Filter[]
  isLoading?: boolean
}

const Sidebar = ({ className, onApplyFilters, filters, isLoading }: SidebarProps) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  useEffect(() => {
    const resetHandler = () => setSelectedFilters({})
    window.addEventListener('resetFilters', resetHandler)
    return () => window.removeEventListener('resetFilters', resetHandler)
  }, [])

  const handleCheckboxChange = (key: string, value: string) => {
    setSelectedFilters((prev: Record<string, string[]>) => {
      const vals = prev[key] || []
      const nextVals = vals.includes(value)
        ? vals.filter((v: string) => v !== value)
        : [...vals, value]
      const next = { ...prev }
      if (nextVals.length) next[key] = nextVals
      else delete next[key]
      return next
    })
  }

  const applyFilters = () => {
    onApplyFilters(selectedFilters)
  }

  if (isLoading) return <Loader />
  if (!filters || !Array.isArray(filters) || filters.length === 0) {
    return <aside className={`w-[20%] ...`}>Нет фильтров</aside>
  }

  if (isLoading) return <Loader />
  if (!filters) return null

  return (
    <aside className={`w-[20%] min-h-screen bg-bg-secondary p-4 shadow-md ${className}`}>
      <Accordion type="multiple" className="w-full">
        {filters.map(filter => {
          const key = filter.title.toLowerCase().trim()

          return (
            <AccordionItem key={filter.characteristicId} value={`item-${key}`} className="border-b">
              <AccordionTrigger className="group flex items-center justify-between w-full text-left py-2 px-4 text-text-primary font-medium hover:text-accent-100">
                {filter.title}
                <ChevronDownIcon
                  className="transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
                  aria-hidden
                />
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-2 text-text-primary">
                {filter.title.toLowerCase() === 'скидка' ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedFilters[key]?.includes('true') ?? false}
                      onCheckedChange={() => handleCheckboxChange(key, 'true')}
                      id={`discount-${key}`}
                    />
                    <span className="cursor-pointer hover:text-blue-500">Скидка</span>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {filter.values.map(value => {
                      const isChecked = selectedFilters[key]?.includes(value) ?? false
                      return (
                        <li key={`${key}-${value}`} className="flex items-center space-x-2">
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => {
                              handleCheckboxChange(key, value)
                            }}
                            id={`${key}-${value}`}
                          />
                          <label
                            htmlFor={`${key}-${value}`}
                            className="cursor-pointer hover:text-blue-500"
                          >
                            {value}
                          </label>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>

      <div className="flex mx-8 mt-4 text-white">
        <Button className="text-base" onClick={applyFilters}>
          Применить фильтры
        </Button>
      </div>
    </aside>
  )
}

const CardWrapper = ({ card }: { card: CardItem }) => {
  return (
    <Card
      key={card.nodeId}
      product={{
        image: String(card.images[0] || noImage),
        price: 0,
        title: card.title,
        description: card.nodeDescription || '',
        rating: { rate: 4.5, count: 10 },
        id: card.nodeId,
        priceByn: card.priceByn,
        priceRub: card.priceRub,
      }}
    />
  )
}

export const Main = () => {
  const handleError = useErrorHandler()
  const searchResults = useSelector((state: RootState) => state.search.results)

  const {
    data: nodeTypes,
    isLoading: isLoadingNodeTypes,
    error: nodeTypesError,
  } = useGetAllNodeTypesQuery({ page: 1, size: 10 })

  const [selectedNodeTypeId, setSelectedNodeTypeId] = useState<number | null>(null)
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<Record<string, string[]>>(
    {}
  )
  const [filtersApplied, setFiltersApplied] = useState(false)
  const [dynamicFilters, setDynamicFilters] = useState<Filter[]>([])

  const {
    data: allCardsData,
    isLoading: allCardsLoading,
    error: allCardsError,
  } = useGetAllCardsQuery(
    {
      pageNumber: 1,
      pageSize: 1000,
      nodeTypeId: selectedNodeTypeId ?? undefined,
      filters: {},
    },
    { refetchOnMountOrArgChange: true }
  )
  console.log(allCardsData)
  const { data: allFiltersData, isLoading: filtersLoading } = useGetAllFiltersQuery({
    nodeTypeId: selectedNodeTypeId ?? undefined,
  })

  useEffect(() => {
    if (!allFiltersData || !allCardsData?.items) {
      setDynamicFilters([])
      return
    }

    const presentMap: Record<number, Set<string>> = {}

    allCardsData.items.forEach(card =>
      card.characteristics.flat().forEach(({ title, value }) => {
        const master = allFiltersData.find(f => f.title === title)
        if (!master) return
        const id = master.characteristicId
        if (!presentMap[id]) presentMap[id] = new Set()
        presentMap[id].add(value)
      })
    )

    const newFilters: Filter[] = allFiltersData
      .filter(f => presentMap[f.characteristicId]?.size > 0)
      .map(f => ({
        characteristicId: f.characteristicId,
        title: f.title,
        values: Array.from(presentMap[f.characteristicId]),
      }))

    setDynamicFilters(newFilters)
    setSelectedCharacteristics({})
    setFiltersApplied(false)
  }, [allFiltersData, allCardsData])

  const displayedCards = useMemo(() => {
    if (!filtersApplied || !allCardsData?.items) {
      return allCardsData?.items || []
    }
    return allCardsData.items.filter(card =>
      Object.entries(selectedCharacteristics).every(([key, values]) => {
        const group = card.characteristics.find(g => g[0]?.title === key)
        if (!group) return false
        return group.some(item => values.includes(item.value))
      })
    )
  }, [allCardsData, selectedCharacteristics, filtersApplied])

  useEffect(() => {
    if (nodeTypesError) handleError(nodeTypesError)
    if (allCardsError) handleError(allCardsError)
  }, [nodeTypesError, allCardsError])

  useEffect(() => {
    const resetHandler = () => {
      setSelectedNodeTypeId(null)
      setSelectedCharacteristics({})
      setFiltersApplied(false)
    }
    window.addEventListener('resetFilters', resetHandler)
    return () => window.removeEventListener('resetFilters', resetHandler)
  }, [])

  const handleApplyFilters = (filters: Record<string, string[]>) => {
    setSelectedCharacteristics(filters)
    setFiltersApplied(Object.keys(filters).length > 0)
  }

  const handleCategoryChange = (id: number) => {
    setSelectedNodeTypeId(id)
  }

  const renderContent = () => {
    if (allCardsError) {
      return (
        <div className="flex items-center justify-center w-full h-[calc(100vh-200px)] pl-[500px]">
          <div className="text-4xl font-semibold text-text-primary">Товары не найдены</div>
        </div>
      )
    }

    if (searchResults && searchResults.length > 0) {
      return (
        <div className="flex flex-wrap justify-center">
          {searchResults.map(card => (
            <Card
              key={card.nodeId}
              product={{
                image: card.images[0] || noImage.src,
                price: card.priceByn || card.priceRub || 0,
                title: card.title,
                description: card.nodeDescription || '',
                rating: { rate: 4.5, count: 10 },
                id: card.nodeId,
                priceByn: card.priceByn,
                priceRub: card.priceRub,
              }}
            />
          ))}
        </div>
      )
    }

    if (allCardsLoading) {
      return <Loader />
    }

    if (displayedCards.length === 0) {
      return (
        <div className="flex items-center justify-center w-full h-[calc(100vh-200px)]">
          <div className="text-4xl font-semibold text-text-primary">Товары не найдены</div>
        </div>
      )
    }

    return (
      <div className="flex flex-wrap justify-center">
        {displayedCards.map(card => (
          <CardWrapper key={card.nodeId} card={card} />
        ))}
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
                onClick={() => handleCategoryChange(nt.id)}
                className="text-white text-xl font-bold hover:text-accent-100 whitespace-nowrap"
              >
                {nt.type}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex w-full min-h-screen">
          <Sidebar
            onApplyFilters={handleApplyFilters}
            filters={dynamicFilters}
            isLoading={allCardsLoading || filtersLoading}
            key={selectedNodeTypeId || 'all'}
          />

          <TabsContent value={selectedNodeTypeId !== null ? selectedNodeTypeId.toString() : 'all'}>
            <div className="flex flex-col w-full p-4">{renderContent()}</div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
