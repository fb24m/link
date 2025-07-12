import type { ReactNode } from 'react'
import styles from './Spinner.module.scss'

export interface SpinnerProps {
	size?: number
	stroke?: string
}

export const Spinner = (props: SpinnerProps): ReactNode => {
	return (
		<svg style={{ width: props.size, height: props.size }} className={styles.spinner} viewBox="0 0 50 50">
			<circle style={{ stroke: props.stroke }} className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
		</svg>
	)
}
