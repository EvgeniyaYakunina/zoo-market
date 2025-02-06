import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'
import CheckmarkOutline from '@/assets/CheckmarkOutline'

export type CheckboxProps = {
  label?: string | null
  onChange?: (checked: CheckboxRadix.CheckedState) => void
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  ({ checked, disabled, id, label, onChange, ...rest }, ref) => {
    const innerId = useId()
    const finalId = id ?? innerId

    return (
      <div className="flex items-center gap-1">
        <div
          className={clsx(
            'flex items-center justify-center w-9 h-9 transition',
            disabled && 'cursor-not-allowed'
          )}
        >
          <CheckboxRadix.Root
            checked={checked}
            className={clsx(
              'flex items-center justify-center w-5 h-5 border-2 rounded-md',
              'border-gray-300 bg-white data-[state=unchecked]:bg-white',
              'data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600',
              'data-[state=unchecked]:hover:bg-gray-200 data-[state=unchecked]:active:bg-gray-300',
              disabled && 'cursor-not-allowed border-gray-400 bg-gray-100'
            )}
            disabled={disabled}
            id={finalId}
            onCheckedChange={onChange}
            ref={ref}
            {...rest}
          >
            <CheckboxRadix.Indicator forceMount>
              {(checked === true || checked === 'indeterminate') && (
                <CheckmarkOutline
                  className={clsx('w-4  text-white', disabled && 'text-gray-400')}
                />
              )}
            </CheckboxRadix.Indicator>
          </CheckboxRadix.Root>
        </div>
        {label && (
          <label
            htmlFor={finalId}
            className={clsx(
              'text-sm pb-0.5',
              disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
