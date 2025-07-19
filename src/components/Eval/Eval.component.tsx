import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Eval.module.scss'

export const Eval = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): ReactNode => {
  return <div className={`${styles.eval} ${className}`} {...props}></div>
}
