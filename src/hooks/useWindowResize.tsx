import { useEffect, useState } from 'react'

interface WindowSize {
  width: number | undefined
}

export function useWindowResize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: undefined })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
