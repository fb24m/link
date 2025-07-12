'use client'

import type { ReactNode } from 'react'
import styles from './SubmitButton.module.scss'
import { useFormStatus } from 'react-dom'
import type { ButtonProps } from '@/ui/components/Button/Button.props'
import { Button } from '@/ui/components/Button/Button.component'
import { Spinner } from '@/ui/components/Spinner/Spinner.component'

export const SubmitButton = ({ children, className, ...props }: ButtonProps): ReactNode => {
	const formStatus = useFormStatus()

	return (
		<Button className={`${styles.button} ${className}`} appearance="primary" {...props}>
			{formStatus.pending ?
				<div className={styles.loader}>
					<Spinner stroke="var(--background-color)" size={18} />
				</div> : ''}
			{children}
		</Button>
	)
}
