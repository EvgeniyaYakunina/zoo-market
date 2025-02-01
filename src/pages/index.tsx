import { Card } from '@/components'
import { royal_canin } from '@/assets'
const testProduct = {
  image: royal_canin,
  price: 1299.99,
  title: 'Беспроводные наушники',
  description: 'С активным шумоподавлением',
  rating: {
    rate: 4.8,
    count: 1523,
  },
  id: 1,
}
export default function Home() {
  return (
    <div
      className={` grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      Welcome to zoo-market!
      <Card product={testProduct} openModal={() => {}} />
    </div>
  )
}
