import type { ReactNode } from 'react'

export interface ButtonProps {
	appearance?: 'primary' | 'secondary' | 'link' | 'transparent'
	href?: string
	className?: string
	children?: ReactNode
	type?: 'submit' | 'button'
	icon?: string
	target?: '_blank'
}
