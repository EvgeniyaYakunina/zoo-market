import { FaShareAlt } from 'react-icons/fa'
import { ShareModal } from '@/components' // Импортируйте ваш модальный компонент
import { useState } from 'react'

interface ShareButtonProps {
  url: string
  title: string
}

export const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {
  const [showShare, setShowShare] = useState(false)

  return (
    <div className="relative inline-block group">
      <FaShareAlt
        className="cursor-pointer text-2xl text-text-secondary hover:text-text-primary"
        onClick={() => setShowShare(true)}
      />
      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} url={url} title={title} />
      {/* Tooltip */}
      <div
        className={`
          absolute
          top-full
          left-1/2
          -translate-x-1/2
          mt-6
          px-3
          py-1
          bg-bg-secondary
          text-text-primary
          text-sm
          rounded-md
          shadow-lg
          opacity-0
          pointer-events-none
          transition-opacity
          duration-200
          group-hover:opacity-100
          z-10
        `}
      >
        Поделиться
      </div>
    </div>
  )
}
