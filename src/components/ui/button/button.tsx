import { Slot } from '@radix-ui/react-slot'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

export type ButtonProps = {
  /**
   * If true, the component will render its children directly without wrapping them in a button element.
   * This is useful when you want to use the button styles on a different element, like an anchor tag.
   * @default false
   */
  asChild?: boolean
  /**
   * - 'outlined': Button with outline and transparent background
   * - 'link': Button that looks like a hyperlink
   * - 'ghost': Button with minimal visual style
   * - 'icon-link': Button styled as a link with an icon
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outlined' | 'link' | 'ghost' | 'icon-link'
  /**
   * If true, the button will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean
} & ComponentPropsWithoutRef<'button'>

/**
 * A customizable button component with various style variants
 * @example
 *Primary button
 * <Button onClick={() => console.log('Clicked!')}>Click me</Button>
 *
 * @example
 *Secondary full-width button
 * <Button variant="secondary" fullWidth>Full Width Button</Button>
 *
 * @example
 *Outlined disabled button
 * <Button variant="outlined" disabled>Disabled Button</Button>
 *
 * @example
 *Ghost button
 * <Button variant="ghost">Ghost Button</Button>
 *
 * @example
 *Link button
 * <Button variant="link" asChild>
 *   <a href="https://example.com">Link Button</a>
 * </Button>
 *
 * @example
 *Icon-link button
 * <Button variant="icon-link" asChild>
 *  <Link href={'#'} passHref><GoogleSvgrepoCom1/></Link>
 * </Button>
 */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', asChild = false, fullWidth, disabled, ...rest }, ref) => {
    const Comp = asChild ? Slot : 'button'

    const baseClasses = `
            inline-flex items-center justify-center
            px-4 py-2
            rounded-lg transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent-100 focus-visible:ring-opacity-50
            disabled:cursor-not-allowed
        `

    const variantClasses = {
      primary: `
                bg-accent-100 text-light-100
                hover:bg-accent-200
                active:bg-accent-300
                disabled:bg-accent-300 disabled:text-light-500
            `,
      secondary: `
                bg-accent-100 bg-opacity-20 text-accent-100
                hover:bg-accent-200
                active:bg-accent-200
                disabled:bg-accent-100 disabled:text-light-500
            `,
      outlined: `
                border border-accent-100 text-light-100
                hover:border-accent-200 hover:text-light-300
                active:border-accent-300 active:text-light-300
                disabled:border-dark-100 disabled:text-light-300
            `,
      link: `
                bg-transparent
                hover:text-light-300
                // active:text-light-300
                disabled:text-light-300
            `,
      ghost: `
                text-light-100 bg-transparent
                hover:bg-dark-300
                active:bg-dark-300
                disabled:text-light-300
            `,
      'icon-link': `
                p-2 text-light-100 bg-dark-300
                hover:text-light-500
                active:text-light-500
                disabled:text-light-500
            `,
    }

    const widthClass = fullWidth ? 'w-full' : ''
    const classNames = `${baseClasses} ${variantClasses[variant]} ${widthClass} ${className || ''}`

    return (
      <Comp
        className={classNames}
        ref={ref}
        {...(asChild
          ? { 'aria-disabled': disabled || undefined }
          : { disabled: disabled || undefined })}
        {...rest}
      />
    )
  }
)

Button.displayName = 'Button'
