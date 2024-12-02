import type { HTMLAttributes } from 'react'

export interface ButtonProps extends HTMLAttributes<HTMLElement> {
	appearance?: 'primary' | 'secondary' | 'link' | 'transparent'
	href?: string
	icon?: string
	target?: '_blank'
	disabled?: boolean
	type?: 'submit' | 'button' | 'reset'
	size?: 'sm' | 'md' | 'lg'
}
