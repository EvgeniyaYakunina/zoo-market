import { useLayoutEffect, useRef, useState } from 'react'

export const useIsOverflow = (watch: string) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isOverflow, setIsOverflow] = useState(false)

  const checkOverflow = () => {
    const el = ref.current
    if (el) {
      setIsOverflow(el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth)
    }
  }

  useLayoutEffect(() => {
    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [watch])

  return [ref, isOverflow] as const
}
