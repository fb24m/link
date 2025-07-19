'use client'

import { useContext, type HTMLAttributes, type ReactNode } from 'react'
import styles from './PopupFooter.module.scss'
import { PopupContext } from '../Popup/Popup.component'
import { Button } from '../Button/Button.component'
import { clsx } from '@/functions/clsx'

export const PopupFooter = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>): ReactNode => {
  const { close } = useContext(PopupContext)

  return (
    <div className={clsx(className, styles.footer)} {...props}>
      <div onClick={close}>
        <Button appearance='secondary' type='button'>
          Закрыть
        </Button>
      </div>
      {children}
    </div>
  )
}
