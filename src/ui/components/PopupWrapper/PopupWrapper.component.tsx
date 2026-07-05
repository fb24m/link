'use client'

import { useContext, type HTMLAttributes, type ReactNode } from 'react'
import styles from './PopupWrapper.module.scss'
import { PopupContext } from '../Popup/Popup.component'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const PopupWrapper = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>): ReactNode => {
  const { opened } = useContext(PopupContext)

  return (
    <div
      {...props}
      className={clsx(
        styles.popup,
        opened
          ? 'bg-black/50! z-20 items-end! p-4 transition-all backdrop-blur-xs'
          : 'bg-black/0 z-20 pointer-events-none items-end! p-0 transition-all',
        styles.wrapper,
        opened && styles.opened,
        className
      )}
    >
      <div
        className={twMerge(
          'p-8 bg-surface-container-high rounded-3xl transition-all duration-400 relative translate-y-1/2 bottom-1/2',
          !opened && 'bottom-0 translate-y-full'
        )}
      >
        {children}
      </div>
    </div>
  )
}
