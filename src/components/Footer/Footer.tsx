import { useWindowResize } from '@/hooks'
import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

export function Footer() {
  const [display, setDisplay] = useState(false)
  const [display1, setDisplay1] = useState(false)
  const [display2, setDisplay2] = useState(false)

  const { width } = useWindowResize()

  return (
    <footer className="w-full bg-purple-700 py-12 mt-auto">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="mb-8">
          {width && width < 1024 ? (
            <div className="flex flex-col">
              {/* Покупателям */}
              <section className="border-b border-gray-300 py-4 relative">
                <h2 className="text-white text-lg font-semibold">Покупателям</h2>
                <ul className={`${display ? 'block' : 'hidden'} mt-3`}>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Как сделать заказ
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Способы оплаты и не только
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Доставка
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Возврат товара
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Возврат денежных средств
                    </a>
                  </li>
                </ul>
                <FaChevronDown
                  className="absolute right-4 top-4 text-gray-400 cursor-pointer"
                  onClick={() => setDisplay(!display)}
                />
              </section>

              {/* Партнерам */}
              <section className="border-b border-gray-300 py-4 relative">
                <h2 className="text-white text-lg font-semibold">Партнерам</h2>
                <ul className={`${display1 ? 'block' : 'hidden'} mt-3`}>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Продавайте на Zoo market
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Водителем
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Курьерам
                    </a>
                  </li>
                </ul>
                <FaChevronDown
                  className="absolute right-4 top-4 text-gray-400 cursor-pointer"
                  onClick={() => setDisplay1(!display1)}
                />
              </section>

              {/* Компания */}
              <section className="border-b border-gray-300 py-4 relative">
                <h2 className="text-white text-lg font-semibold">Компания</h2>
                <ul className={`${display2 ? 'block' : 'hidden'} mt-3`}>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      О нас
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Реквизиты
                    </a>
                  </li>
                </ul>
                <FaChevronDown
                  className="absolute right-4 top-4 text-gray-400 cursor-pointer"
                  onClick={() => setDisplay2(!display2)}
                />
              </section>
            </div>
          ) : (
            <div className="flex justify-between">
              {/* Покупателям */}
              <section className="w-1/5">
                <h2 className="text-white text-lg font-semibold mb-4">Покупателям</h2>
                <ul>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Как сделать заказ
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Способы оплаты
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Доставка
                    </a>
                  </li>
                </ul>
              </section>

              {/* Партнерам */}
              <section className="w-1/5">
                <h2 className="text-white text-lg font-semibold mb-4">Партнерам</h2>
                <ul>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Продавайте на Zoo market
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Водителем
                    </a>
                  </li>
                </ul>
              </section>

              {/* Компания */}
              <section className="w-1/5">
                <h2 className="text-white text-lg font-semibold mb-4">Компания</h2>
                <ul>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      О нас
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-300 hover:text-white" href="#">
                      Реквизиты
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          )}

          {/* Нижняя часть футера */}
          <div className="mt-8 text-gray-400 text-sm">
            <p>
              2004-2023 © Zoo market — модный интернет-магазин одежды, обуви и аксессуаров для
              животных. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
