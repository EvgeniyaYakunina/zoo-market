import { ReactNode } from 'react'
import { Header, Footer } from '@/components'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={'flex flex-col justify-between min-h-screen w-full'}>
      <Header />
      <main className="mt-[92px]">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
