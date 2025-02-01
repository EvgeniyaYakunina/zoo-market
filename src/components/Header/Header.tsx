import { useState } from "react"
import SignUpAndBasket, {SignUpAndBasketProps} from "@/components/Header/SignUpAndBasket/SignUpAndBasket"
import {BsCart2} from "react-icons/bs"
import {GoHomeFill} from "react-icons/go"
import {IoPerson} from "react-icons/io5"
import Search from "@/components/Header/Search/Search"
import {useRouter} from "next/router";
import {ROUTES} from "@/utils/routes";


const Header= () => {
    const router = useRouter()
    const [value, setValue] = useState<string>('')
    const carts: SignUpAndBasketProps["carts"] = [{ id: 1, name: "Cats", price: 130 }]

    return (
        <>
            <header className="fixed w-full z-10 top-0 p-4 bg-blue-600">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center mt-2">
                        <div className="mr-4">
                            <div className="text-white text-2xl font-semibold" onClick={() => router.push(ROUTES.HOME)}>
                                {'ZooMarket'}
                            </div>
                        </div>
                        <Search
                            placeholder="Найти"
                            value={value}
                            setValue={() => setValue}
                        />
                        <SignUpAndBasket carts={carts} />
                    </div>
                </div>
            </header>

            <div className="block bg-white w-full p-4 fixed bottom-0 z-50 shadow-md md:hidden">
                <ul className="flex justify-around">
                    <li >
                            <GoHomeFill
                                onClick={() => router.push(ROUTES.SIGN_IN)}
                                className={`w-6 h-6 cursor-pointer`}
                            />
                    </li>
                    <li className={'relative'}>
                            <BsCart2
                                onClick={() => router.push(ROUTES.BASKET)}
                                className={`w-6 h-6 cursor-pointer`}
                            />
                            {carts.length > 0 && (
                                <span className="absolute -top-2 -right-3 text-xs w-5 h-5 bg-red-500 text-white rounded-full text-center">
                  {carts.length}
                </span>
                            )}
                    </li>
                    <li >
                            <IoPerson
                                onClick={() => router.push(ROUTES.SIGN_IN)}
                                className={`w-6 h-6 cursor-pointer`}
                            />
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Header
