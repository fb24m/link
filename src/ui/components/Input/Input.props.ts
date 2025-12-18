import type { HTMLAttributes, RefObject } from 'react'

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLInputElement>
  placeholder?: string
  appearance?: 'rounded'
  name?: string
  autoComplete?: string
  type?: 'password' | 'email' | 'text'
  required?: boolean
}
