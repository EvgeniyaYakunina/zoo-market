import { IoPerson } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import Link from "next/link";

export type SignUpAndBasketProps = {
    carts: { id: number; name: string; price: number }[]
}

const SignUpAndBasket = ({ carts }:SignUpAndBasketProps) => {
    return (
        <div className="flex space-x-6 px-4">
            <ul className="relative flex flex-col items-center text-white/60 hover:text-white transition-all">
                <Link href="/signIn" className="flex flex-col items-center">
                    <IoPerson className="w-8 h-8" />
                    <span className="text-sm">Войти</span>
                </Link>
            </ul>

            <ul className="relative flex flex-col items-center text-white/60 hover:text-white transition-all">
                <Link href="/basket" className="flex flex-col items-center relative">
                    <BsCart2 className="w-8 h-8" />
                    <span className="text-sm">Корзина</span>
                    {carts.length > 0 && (
                        <span className="absolute top-0 right-0 text-xs w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
              {carts.length}
            </span>
                    )}
                </Link>
            </ul>
        </div>
    );
};

export default SignUpAndBasket
