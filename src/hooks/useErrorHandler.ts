import { toast } from 'react-toastify'

type ServerError = {
  statusCode?: number
  message?: string
  error?: string
  details?: unknown[]
}

type RTKQueryError = {
  status: number | string
  data?: ServerError
  error?: string
}

export const useErrorHandler = () => {
  const handleError = (err: unknown) => {
    console.error('Error occurred:', err)

    if (err && typeof err === 'object') {
      if ('status' in err) {
        const rtkError = err as RTKQueryError

        if (rtkError.data?.error) {
          // Обработка ошибки в формате { "details": [], "error": "Failed to get cards" }
          toast.error(rtkError.data.error)
        } else if (rtkError.data?.message) {
          toast.error(rtkError.data.message)
        } else if (rtkError.error) {
          toast.error(rtkError.error)
        } else {
          toast.error('An unknown RTK Query error occurred')
        }
      } else if ('data' in err) {
        const serverError = err.data as ServerError
        if (serverError.error) {
          toast.error(serverError.error)
        } else if (serverError.message) {
          toast.error(serverError.message)
        } else {
          toast.error('An unknown server error occurred')
        }
      }
    } else if (err instanceof Error) {
      toast.error(err.message)
    } else if (typeof err === 'string') {
      toast.error(err)
    } else {
      toast.error('An unknown error occurred')
    }
  }

  return handleError
}
