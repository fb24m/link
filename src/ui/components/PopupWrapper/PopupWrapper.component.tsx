'use client'

import { useContext, type HTMLAttributes, type ReactNode } from 'react'
import styles from './PopupWrapper.module.scss'
import { PopupContext } from '../Popup/Popup.component'
import { clsx } from '@/functions/clsx'
import Icon from '../Icon/Icon.component'
import { Button } from '../Button/Button.component'

export const PopupWrapper = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>): ReactNode => {
  const { toggle, topCloseButton, opened } = useContext(PopupContext)

  return (
    <div className={clsx(styles.popup, styles.wrapper, opened && styles.opened)}>
      <div className={clsx(styles.window, className, opened && styles.opened)} {...props}>
        {topCloseButton && (
          <div className={styles.popupHeader}>
            <Button onClick={toggle} className={styles.topCloseButton}>
              <Icon icon='close'></Icon>
            </Button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
