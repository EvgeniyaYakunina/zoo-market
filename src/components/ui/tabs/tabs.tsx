import * as TabsRadix from '@radix-ui/react-tabs'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

type TabsProps = ComponentPropsWithoutRef<typeof TabsRadix.Root>

/* Tabs component that serves as a container for tabbed navigation.
 * Wraps Radix UI's TabsRoot component.
 *
 * @example
 * <Tabs onValueChange={(value) => console.log(value)}>
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 */

export const Tabs = forwardRef<ElementRef<typeof TabsRadix.Root>, TabsProps>(
  ({ onValueChange, children, className, ...rest }, ref) => {
    return (
      <TabsRadix.Root
        className={`w-full ${className}`}
        onValueChange={onValueChange}
        ref={ref}
        {...rest}
      >
        {children}
      </TabsRadix.Root>
    )
  }
)

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsRadix.List>

export const TabsList = forwardRef<ElementRef<typeof TabsRadix.List>, TabsListProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <TabsRadix.List ref={ref} {...rest} className={`flex w-full bg-dark-200 ${className}`}>
        {children}
      </TabsRadix.List>
    )
  }
)

export type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsRadix.Trigger>

export const TabsTrigger = forwardRef<ElementRef<typeof TabsRadix.Trigger>, TabsTriggerProps>(
  ({ value, className, ...rest }, ref) => {
    return (
      <TabsRadix.Trigger
        value={value}
        className={`
                    flex-1 px-6 py-1
                    transition-all duration-200
                    data-[state=active]:bg-dark-100 
                    disabled:cursor-not-allowed
                    ${className}
                `}
        ref={ref}
        {...rest}
      />
    )
  }
)

export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsRadix.Content>

export const TabsContent = forwardRef<ElementRef<typeof TabsRadix.Content>, TabsContentProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <TabsRadix.Content
        className={`focus-visible:outline-none ${className} bg-none`}
        ref={ref}
        {...rest}
      >
        {children}
      </TabsRadix.Content>
    )
  }
)

Tabs.displayName = 'Tabs'
TabsList.displayName = 'TabsList'
TabsTrigger.displayName = 'TabsTrigger'
TabsContent.displayName = 'TabsContent'
