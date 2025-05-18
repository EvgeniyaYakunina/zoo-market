interface ResultModalProps {
  isSuccess: boolean
  onClose: () => void
}

export const ResultModal = ({ isSuccess, onClose }: ResultModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">
          {isSuccess ? 'Благодарим за заказ!' : 'Что-то пошло не так'}
        </h2>
        <p className="text-gray-600 mb-6">
          {isSuccess
            ? 'Вы успешно создали заявку, с вами свяжутся в ближайшее время.'
            : 'Заявка не оформлена, приносим свои извинения.'}
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}
