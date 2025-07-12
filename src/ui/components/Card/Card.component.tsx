import type { ReactNode } from 'react'
import styles from './Card.module.scss'
import type { CardProps } from './Card.props'
import { clsx } from '@/functions/clsx'

export const Card = ({ className, mobileShrink, ...props }: CardProps): ReactNode => {
	return (
		<div className={clsx(className, styles.card, mobileShrink && styles.mobileShrink)} {...props}></div>
	)
}
