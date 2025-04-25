import { useEffect } from 'react'

interface ToastProps {
  message: string
  open: boolean
  duration?: number
  onClose: () => void
}

export const Toast = ({ message, open, duration = 3000, onClose }: ToastProps) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [open, duration, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="bg-black text-white px-6 py-3 rounded-md shadow-lg pointer-events-auto">
        {message}
      </div>
    </div>
  )
}
