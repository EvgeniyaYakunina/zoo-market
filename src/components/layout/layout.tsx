import { ReactNode } from 'react'
import { Header, Footer } from '@/components'

const Layout = ({ children }: { children: ReactNode }) => {
  // const [searchResults, setSearchResults] = useState<CardItem[] | null>(null); // Состояние для результатов поиска

  // Функция для обработки результатов поиска
  const handleSearchResults = () => {
    // setSearchResults(results);
  }

  // Функция для отображения карточек
  // const renderCards = (cardsToRender: CardItem[]) => {
  //     return cardsToRender.map((card) => (
  //         <Card
  //             key={card.nodeId}
  //             product={{
  //                 image: card.images[0] || noImage,
  //                 price: 100,
  //                 title: card.title,
  //                 description: card.nodeDescription || '',
  //                 rating: { rate: 4.5, count: 10 },
  //                 id: card.nodeId,
  //             }}
  //         />
  //     ));
  // };
  return (
    <div className={'flex flex-col justify-between min-h-screen w-full'}>
      <Header onSearchResults={handleSearchResults} />
      <main className="mt-[92px]">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
