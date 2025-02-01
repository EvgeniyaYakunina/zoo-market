import {ReactNode} from "react"
import {Header,Footer} from "@/components"

const Layout=({ children }: { children: ReactNode })=>{
    return(
        <div className={'flex flex-col min-h-screen justify-between'}>
            <Header/>
            <main className="flex flex-1 items-center justify-center min-h-[calc(100vh-var(--header-height))] w-full">
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default Layout