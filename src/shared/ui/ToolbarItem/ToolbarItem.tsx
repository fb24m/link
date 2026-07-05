import { Button } from '@/shared/ui/Button/Button.component'
import { useToolbarContext } from '../Toolbar/Toolbar.context'
import { twMerge } from 'tailwind-merge'
import Icon from '@/ui/components/Icon/Icon.component'
import { ComponentProps } from 'react'
import { ToolbarColor, ToolbarVariant } from '../Toolbar/Toolbar.types'

export interface ToolbarItemProps extends ComponentProps<'button'> {
  icon?: string
  children?: string
  active?: boolean
}

const colors: Record<'active' | 'inactive', Record<ToolbarColor, string>> = {
  active: { standard: 'bg-primary text-on-primary', vibrant: 'bg-surface-container text-on-surface' },
  inactive: { standard: 'bg-transparent text-on-surface-container', vibrant: 'text-on-primary-container' },
}

const variants: Record<ToolbarVariant, string> = { docked: 'rounded-xl', floating: 'rounded-4xl' }

export const ToolbarItem = ({ icon, children, active, ...props }: ToolbarItemProps) => {
  const { color, variant } = useToolbarContext()

  return (
    <Button
      size="sm"
      appearance="text"
      className={twMerge(
        'block w-10 h-10 transition-all duration-75',
        variants[variant],
        colors[active ? 'active' : 'inactive'][color ?? 'standard']
      )}
      type="button"
      {...props}
    >
      {icon && <Icon icon={icon}></Icon>}
    </Button>
  )
}
