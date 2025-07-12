import type { HTMLAttributes } from 'react'

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
	gap?: number
	alignItems?: 'start' | 'end' | 'center' | 'stretch'
	justifyContent?: 'start' | 'end' | 'flex-end' | 'center' | 'space-between' | 'stretch'
	direction?: 'column' | 'row'
}
