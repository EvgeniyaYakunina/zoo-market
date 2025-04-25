import { AiFillQuestionCircle } from 'react-icons/ai'
import { FiCopy } from 'react-icons/fi'

interface ProductDetailsProps {
  title: string
  characteristics: Array<{
    title: string
    value: string
    description?: string | null
    additionalParams?: Record<string, unknown> | null
  }>
  onCopy: (value: string) => void
}

export const ProductDetails = ({ title, characteristics, onCopy }: ProductDetailsProps) => {
  return (
    <div className="flex flex-col w-auto">
      {/* Заголовок */}
      <h1 className="text-2xl font-semibold text-text-primary mb-1">{title}</h1>

      {/* Характеристики */}
      <div className="mt-5 flex text-lg">
        {characteristics && characteristics.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-2 text-text-tertiary">Характеристики:</h3>
            <ul className="text-text-primary space-y-2">
              {characteristics.map((char, index) => (
                <li
                  key={index}
                  className="p-2 border border-bg-secondary rounded-md flex justify-between items-center"
                >
                  <div>
                    <div className="flex items-center gap-2 relative">
                      {char.value && (
                        <div className="relative inline-block group">
                          <AiFillQuestionCircle
                            className="text-text-tertiary cursor-pointer"
                            aria-label="Показать подсказку"
                          />
                          <div className="absolute bottom-full left-1/2 -translate-x-1 mb-2 w-48 p-2 bg-bg-secondary text-sm text-text-primary rounded-md shadow-lg opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 z-10 ">
                            <div>{char.value}</div>
                            <div>{char.description}</div>
                            <div>
                              {char.additionalParams && (
                                <div>
                                  {Object.entries(char.additionalParams).map(([key, value]) => (
                                    <div key={key}>{`${key}: ${String(value)}`}</div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      <span className="text-text-tertiary ">{char.title}:</span>
                      <span>{char.value}</span>
                    </div>

                    {char.description && (
                      <p className="text-text-tertiary text-sm mt-1">{char.description}</p>
                    )}
                  </div>

                  {char.title === 'артикул' && (
                    <button
                      onClick={() => onCopy(char.value)}
                      className="ml-2 text-text-secondary hover:text-text-primary"
                      aria-label="Скопировать артикул"
                    >
                      <FiCopy />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
