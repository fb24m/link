import type { ReactNode } from 'react'
import type { InputProps } from './Input.props'
import styles from '@/ui/scss/Input.module.scss'

export const Input = ({ className, ...props }: InputProps): ReactNode => {
	return (
		<div className={`${styles.wrapper} ${className}`}>
			<input type="text" {...props} className={styles.input} />
		</div>
	)
}
