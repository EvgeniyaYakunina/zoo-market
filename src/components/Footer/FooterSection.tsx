import { ReactNode } from 'react'
import { FaChevronDown } from 'react-icons/fa'

interface FooterSectionProps {
  title: string
  children: ReactNode
  isOpen?: boolean
  onToggle?: () => void
  isMobile?: boolean
  className?: string
}

export const FooterSection = ({
  title,
  children,
  isOpen,
  onToggle,
  isMobile = false,
  className = '',
}: FooterSectionProps) => {
  if (isMobile) {
    return (
      <section className={`border-b border-red py-4 relative ${className}`}>
        <h2 className="text-white text-lg font-semibold">{title}</h2>
        <div className={`${isOpen ? 'block' : 'hidden'} mt-3`}>{children}</div>
        {onToggle && (
          <FaChevronDown
            className="absolute right-4 top-4 text-border-primary cursor-pointer"
            onClick={onToggle}
          />
        )}
      </section>
    )
  }

  return (
    <section className={`w-1/5 ${className}`}>
      <h2 className="text-white text-lg font-semibold mb-4">{title}</h2>
      {children}
    </section>
  )
}
