import type { ReactNode } from 'react'
import type { TextareaProps } from './Textarea.props'
import styles from '@/ui/scss/Input.module.scss'

const Textarea = (props: TextareaProps): ReactNode => {
	return (
		<div className={styles.wrapper}>
			<textarea {...props} className={styles.textarea}></textarea>
		</div>
	)
}

export default Textarea
