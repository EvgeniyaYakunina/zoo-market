import { FC } from 'react'
import { FaTelegramPlane, FaWhatsapp, FaViber, FaTimes } from 'react-icons/fa'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title?: string
}

export const ShareModal: FC<ShareModalProps> = ({ isOpen, onClose, url, title = '' }) => {
  if (!isOpen) return null

  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(title)

  const links = [
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      icon: <FaTelegramPlane />,
      bg: 'bg-blue-400 hover:bg-blue-500',
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      icon: <FaWhatsapp />,
      bg: 'bg-green-500 hover:bg-green-600',
    },
    {
      name: 'Viber',
      href: `viber://forward?text=${encodedText}%20${encodedUrl}`,
      icon: <FaViber />,
      bg: 'bg-purple-600 hover:bg-purple-700',
    },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-lg p-6 w-80 mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-2 right-2 text-text-secondary hover:text-text-primary"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center text-text-primary dark:text-text-secondary">
          Поделиться
        </h2>

        <ul className="space-y-3">
          {links.map(({ name, href, icon, bg }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${bg} text-white flex items-center gap-2 px-4 py-2 rounded-md transition-opacity duration-150`}
              >
                {icon} <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
