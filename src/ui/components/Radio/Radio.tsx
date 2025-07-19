import type { ReactNode } from 'react'
import type { RadioProps } from './Radio.props'
import styles from './Radio.module.scss'
import { randomUUID } from 'crypto'

export const Radio = ({
  className,
  label,
  ...props
}: RadioProps): ReactNode => {
  const id = randomUUID()

  return (
    <div className={className}>
      <input className={styles.radio} type='radio' id={id} {...props} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
