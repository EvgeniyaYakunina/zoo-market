interface SizeTableProps {
  sizes: Array<{
    title: string
    value: string
    description?: string | null
    additionalParams?: Record<string, unknown> | null
  }>
}
export const SizeTable = ({ sizes }: SizeTableProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-base text-text-tertiary">Таблица размеров:</h4>
        <a href="#" className="text-sm text-gray-400 hover:text-gray-600">
          ›
        </a>
      </div>
      <div className="flex gap-2">
        {sizes.map((size, index) => {
          const isZero = size.additionalParams?.['количество'] === 0
          return (
            <div key={index} className="relative inline-block group">
              <button
                disabled={isZero}
                className={`border rounded-lg px-4 py-2 flex flex-col items-center text-sm transition
          ${isZero ? 'opacity-50 cursor-not-allowed' : ''}

        `}
              >
                <span className="text-lg">{size.value}</span>
              </button>
              {!isZero && (size.description || size.additionalParams) && (
                <div className="absolute bottom-full left-1/2 -translate-x-1 mb-2 w-48 p-2 bg-bg-secondary text-sm text-text-primary rounded-md shadow-lg opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 z-10">
                  {size.description && <div>{size.description}</div>}
                  {size.additionalParams && (
                    <div className="mt-1">
                      {Object.entries(size.additionalParams).map(([key, value]) => (
                        <div key={key}>{`${key}: ${String(value)}`}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
