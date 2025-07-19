import type { HTMLAttributes } from 'react'

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string
  name?: string
  autoComplete?: string
  type?: 'password' | 'email' | 'text'
  required?: boolean
}
