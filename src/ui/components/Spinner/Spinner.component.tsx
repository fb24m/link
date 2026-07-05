import type { ReactNode } from 'react'
import styles from './Spinner.module.scss'
import { twMerge } from 'tailwind-merge'

export interface SpinnerProps {
  size?: number
  stroke?: string
  className?: string
}

export const Spinner = ({ size, className, stroke }: SpinnerProps): ReactNode => {
  return (
    <svg style={{ width: size, height: size }} className={styles.spinner} viewBox="0 0 50 50">
      <circle
        style={{ ...(stroke && { stroke }) }}
        className={twMerge(styles.path, className)}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      ></circle>
    </svg>
  )
}
