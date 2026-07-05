import type { ComponentProps } from 'react'

export interface InputProps extends ComponentProps<'input'> {
  placeholder?: string
  appearance?: 'rounded'
  name?: string
  autoComplete?: string
  type?: 'password' | 'email' | 'text'
  required?: boolean
}
