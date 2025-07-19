import type { ReactNode } from 'react'
import styles from './Box.module.scss'
import type { BoxProps } from './Box.props'

export const Box = ({
  gap = 8,
  alignItems = 'start',
  justifyContent = 'start',
  direction = 'column',
  className,
  ...props
}: BoxProps): ReactNode => {
  return (
    <div
      style={{ gap, alignItems, justifyContent, flexDirection: direction }}
      className={`${styles.box} ${className}`}
      {...props}
    ></div>
  )
}
