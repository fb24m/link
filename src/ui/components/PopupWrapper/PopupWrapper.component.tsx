'use client'

import { useContext, type HTMLAttributes, type ReactNode } from 'react'
import styles from './PopupWrapper.module.scss'
import { PopupContext } from '../Popup/Popup.component'
import { clsx } from '@/functions/clsx'

export const PopupWrapper = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>): ReactNode => {
  const { opened } = useContext(PopupContext)

  return (
    <div {...props} className={clsx(styles.popup, styles.wrapper, opened && styles.opened, className)}>
      <div className={clsx(styles.card, opened && styles.opened)}>{children}</div>
    </div>
  )
}
