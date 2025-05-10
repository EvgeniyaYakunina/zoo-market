import Layout from '@/components/layout/layout'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import '@/styles/globals.css'
import 'swiper/css/free-mode'
import 'swiper/css/keyboard'
import 'swiper/css/mousewheel'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store, AppDispatch } from '@/app/store/store'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { fetchCurrency } from '@/app/store/slices/currencySlice'
import { useDispatch as useReduxDispatch } from 'react-redux'

const useDispatch = () => useReduxDispatch<AppDispatch>()

// InnerApp component that uses the Redux dispatch
function InnerApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCurrency())
  }, [dispatch])

  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Layout>
  )
}

// Main App component that wraps InnerApp with Provider
export default function App(props: AppProps) {
  return (
    <Provider store={store}>
      <InnerApp {...props} />
    </Provider>
  )
}
