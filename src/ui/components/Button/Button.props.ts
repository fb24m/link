import type { HTMLAttributes } from 'react'

export type LoaderType = 'skeleton' | 'spinner'

export interface ButtonProps extends HTMLAttributes<HTMLElement> {
  appearance?: 'primary' | 'secondary' | 'link' | 'transparent' | 'filled_secondary'
  icon?: string
  disabled?: boolean
  type?: 'submit' | 'button' | 'reset'
  size?: 'sm' | 'md' | 'lg'
  loader?: LoaderType
}
