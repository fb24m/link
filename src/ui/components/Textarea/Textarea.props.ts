import type { HTMLAttributes } from 'react'

export interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
	placeholder?: string
	name?: string
	autoComplete?: string
	type?: 'password' | 'email' | 'text'
	required?: boolean
}
