import './admin.css'
import { useRouter } from 'next/router'
import { Button } from '@/components'

export const Admin = () => {
  const router = useRouter()

  const click = (address: string) => {
    router.push(`/admin/${address}`)
  }

  return (
    <div>
      <Button onClick={() => click('characteristics')}>Характеристики</Button>
      <Button onClick={() => click('nodeTypes')}>Типы узлов</Button>
      <Button onClick={() => click('cards')}>Создание карточки</Button>
    </div>
  )
}
