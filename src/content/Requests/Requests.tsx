import { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion'
import { FiChevronDown } from 'react-icons/fi'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

type OrderFormData = {
  phone: string
  fullName: string
  email: string
  telegram?: string
  comment?: string
}

type OrderItem = {
  id: number
  image: string
  price: number
  originalPrice?: number
  sale?: number | null
  title: string
  description?: string | null
  priceByn?: number
  priceRub?: number
  availableSizes: { value: string; quantity: number }[]
  quantity: number
}

type OrderRecord = {
  orderNumber: string
  orderDate: string // ISO-строка
  customer: OrderFormData
  items: OrderItem[]
  totalAmount: number
  status: string
}

export function Requests() {
  const [orders, setOrders] = useState<OrderRecord[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('orderHistory') || '[]'
      const parsed: OrderRecord[] = JSON.parse(stored)
      setOrders(Array.isArray(parsed) ? parsed : [])
    } catch {
      setOrders([])
    }
  }, [])

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString)
      return format(date, 'd MMMM yyyy', { locale: ru })
    } catch {
      return isoString
    }
  }

  return (
    <div className="px-4 pt-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">История моих заявок</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">У вас пока нет совершённых заявок.</p>
      ) : (
        <Accordion type="multiple" className="space-y-4">
          {orders.map(order => (
            <AccordionItem
              key={order.orderNumber}
              value={order.orderNumber}
              className="border rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="flex justify-between items-center bg-gray-100 px-4 py-3 cursor-pointer">
                <div className="text-base">
                  <span className="font-semibold">№ {order.orderNumber}</span>{' '}
                  <span className="text-sm text-gray-600">
                    (дата: {formatDate(order.orderDate)})
                  </span>
                </div>
                <FiChevronDown className="w-5 h-5 text-gray-700 transition-transform duration-200 radix-state-open:rotate-180" />
              </AccordionTrigger>

              <AccordionContent className="bg-white border-t px-4 py-4">
                {/* Информация о заказчике */}
                <div className="mb-4 space-y-1">
                  <p>
                    <span className="font-medium">Клиент:</span> {order.customer.fullName}
                  </p>
                  <p>
                    <span className="font-medium">Телефон:</span> {order.customer.phone}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {order.customer.email}
                  </p>
                  {order.customer.telegram && (
                    <p>
                      <span className="font-medium">Telegram:</span> {order.customer.telegram}
                    </p>
                  )}
                  {order.customer.comment && (
                    <p>
                      <span className="font-medium">Комментарий:</span> {order.customer.comment}
                    </p>
                  )}
                </div>

                {/* Список товаров */}
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">Кол-во: {item.quantity}</p>
                        <p className="text-sm text-gray-600">
                          Цена:{' '}
                          {item.price.toLocaleString('ru-RU', {
                            minimumFractionDigits: 2,
                          })}{' '}
                          р.
                        </p>
                        {item.originalPrice !== undefined && item.originalPrice > item.price && (
                          <p className="text-sm text-red-500">
                            Старая цена:{' '}
                            {item.originalPrice.toLocaleString('ru-RU', {
                              minimumFractionDigits: 2,
                            })}{' '}
                            р.
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Итоговая сумма */}
                <div className="mt-4 border-t pt-3 flex justify-between items-center">
                  <span className="font-semibold">Сумма заказа:</span>
                  <span className="font-bold text-lg">
                    {order.totalAmount.toLocaleString('ru-RU', {
                      minimumFractionDigits: 2,
                    })}{' '}
                    р.
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
