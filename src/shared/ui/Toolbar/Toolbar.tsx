import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { ToolbarColor, ToolbarVariant } from './Toolbar.types'
import { ToolbarProvider } from './Toolbar.context'

export interface ToolbarProps extends ComponentProps<'div'> {
  variant?: ToolbarVariant
  color?: ToolbarColor
  fab?: ReactNode
}

const variants: Record<ToolbarVariant, string> = {
  docked: 'bottom-0 left-0 w-full',
  floating: 'bottom-3 left-1/2 -translate-x-1/2',
}

const containerVariants: Record<ToolbarVariant, string> = {
  docked: 'p-4 py-3 w-full justify-between',
  floating: 'p-3 rounded-full',
}

const colorVariants: Record<ToolbarColor, string> = {
  standard: 'bg-surface-container',
  vibrant: 'bg-primary-container',
}

export const Toolbar = ({ children, className, variant = 'docked', color = 'standard', fab }: ToolbarProps) => {
  return (
    <ToolbarProvider color={color} variant={variant}>
      <div
        className={twMerge(
          'flex items-center gap-2 fixed bottom-2 transition-all duration-75',
          variants[variant],
          className
        )}
      >
        <div className={twMerge('flex gap-1', containerVariants[variant], colorVariants[color])}>{children}</div>

        {fab}
      </div>
    </ToolbarProvider>
  )
}
