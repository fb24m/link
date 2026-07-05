import type { ReactNode } from 'react'
import type { CardProps } from './Card.props'
import { twMerge } from 'tailwind-merge'

export const Card = ({ className, mobileShrink, ...props }: CardProps): ReactNode => {
  return (
    <div
      className={twMerge(
        mobileShrink
          ? 'bg-transparent sm:bg-surface-container sm:p-5 sm:rounded-3xl'
          : 'bg-surface-container p-5 rounded-3xl',
        className
      )}
      {...props}
    ></div>
  )
}
