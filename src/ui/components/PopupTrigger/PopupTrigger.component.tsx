'use client'

import { useContext, type HTMLAttributes, type ReactNode } from 'react'
import { PopupContext } from '../Popup/Popup.component'

export interface PopupTriggerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  onClick?: (arg: () => void) => void
}

export const PopupTrigger = ({ onClick, ...props }: PopupTriggerProps): ReactNode => {
  const popup = useContext(PopupContext)

  return (
    <div
      {...props}
      style={{ display: 'contents' }}
      onClick={() => (onClick ? onClick(popup.toggle) : popup.toggle)}
    ></div>
  )
}
