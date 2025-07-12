import type { HTMLAttributes } from 'react'

export interface BurgerProps extends HTMLAttributes<HTMLDivElement> {
	openedClass: string
}
