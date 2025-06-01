// import { useRouter } from 'next/router'
// import { ROUTES } from '@/utils/routes'
import React from 'react'
import RequestsIcon from '@/assets/Requests'

type RequestsTriggerProps = {
  label?: string
  className?: string
}

export const RequestsTrigger = ({ label = 'заказы', className = '' }: RequestsTriggerProps) => {
  // const router = useRouter()

  const handleClick = () => {
    // router.push(ROUTES.REQUESTS)
  }

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center cursor-pointer group ${className} px-[1rem]`}
    >
      <RequestsIcon width={30} height={30} className={className} />
      <span className="mt-1 text-sm text-white/60 group-hover:text-white transition-colors">
        {label}
      </span>
    </div>
  )
}
