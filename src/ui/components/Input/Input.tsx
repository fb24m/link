import type { ReactNode } from 'react'
import type { InputProps } from './Input.props'
import styles from '@/ui/scss/Input.module.scss'
import { clsx } from '@/functions/clsx'

export const Input = ({ className, appearance, ...props }: InputProps): ReactNode => {
  return (
    <div className={clsx(styles.wrapper, className, appearance === 'rounded' && styles.expressive)}>
      <input type='text' {...props} className={styles.input} />
    </div>
  )
}
