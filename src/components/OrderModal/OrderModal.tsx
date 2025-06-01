import { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { ButtonSpinner } from '../ButtonSpinner'

type OrderModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: OrderFormData) => void
  onOrderResult: (success: boolean) => void
}

export type OrderFormData = {
  phone: string
  fullName: string
  email: string
  telegram?: string
  comment?: string
}

// TODO: Replace with real API call when backend is ready
const fakeSubmitOrder = async (_formData: OrderFormData): Promise<boolean> => {
  try {
    // Эмулируем отправку на сервер
    await new Promise(resolve => setTimeout(resolve, 2000))
    return true // В реальном приложении здесь будет проверка ответа от сервера
  } catch (error) {
    console.error('Error submitting order:', error)
    return false
  }
}

export const OrderModal = ({ isOpen, onClose, onSubmit, onOrderResult }: OrderModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<OrderFormData>({
    phone: '',
    fullName: '',
    email: '',
    telegram: '',
    comment: '',
  })

  const [errors, setErrors] = useState<Partial<OrderFormData>>({})

  const validateForm = () => {
    const newErrors: Partial<OrderFormData> = {}

    // Validate phone - exactly 7 digits
    if (!formData.phone) {
      newErrors.phone = 'Телефон обязателен'
    } else {
      const digitsOnly = formData.phone.replace(/\D/g, '')
      if (digitsOnly.length < 11 || digitsOnly.length > 13) {
        newErrors.phone = 'Телефон должен содержать от 11 до 13 цифр'
      }
    }

    // Validate fullName - min 5 chars, only letters, spaces and hyphens
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'ФИО обязательно'
    } else if (formData.fullName.trim().length < 5) {
      newErrors.fullName = 'ФИО должно содержать минимум 5 символов'
    } else if (!/^[а-яА-Яa-zA-Z\s-]+$/.test(formData.fullName)) {
      newErrors.fullName = 'ФИО может содержать только буквы, пробелы и дефисы'
    }

    // Validate email - required, standard format
    if (!formData.email) {
      newErrors.email = 'Email обязателен'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Неверный формат email'
    }

    // Validate telegram - optional, @ + min 5 alphanumeric/underscore
    if (formData.telegram) {
      if (!/^@[a-zA-Z0-9_]{5,}$/.test(formData.telegram)) {
        newErrors.telegram =
          'Telegram должен начинаться с @ и содержать минимум 5 символов (буквы, цифры или подчёркивания)'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      try {
        const success = await fakeSubmitOrder(formData)
        if (success) {
          onSubmit(formData)
          onClose()
          onOrderResult(true)
        } else {
          onOrderResult(false)
        }
      } catch (error) {
        console.error('Error submitting order:', error)
        onOrderResult(false)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Оформление заказа</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Телефон <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              international
              defaultCountry="RU"
              value={formData.phone}
              countries={['RU', 'BY']}
              onChange={value => setFormData({ ...formData, phone: value || '' })}
              className="w-full p-2 border rounded-lg"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              ФИО <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="Иванов Иван Иванович"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="example@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Telegram</label>
            <input
              type="text"
              value={formData.telegram}
              onChange={e => setFormData({ ...formData, telegram: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="@username"
            />
            {errors.telegram && <p className="text-red-500 text-sm mt-1">{errors.telegram}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Комментарий к заказу</label>
            <textarea
              value={formData.comment}
              onChange={e => setFormData({ ...formData, comment: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={isLoading}
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <ButtonSpinner />
                  <span>Отправка...</span>
                </>
              ) : (
                'Отправить заказ'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
