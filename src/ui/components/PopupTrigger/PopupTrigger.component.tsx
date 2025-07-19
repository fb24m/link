'use client'

import { useContext, type HTMLAttributes, type ReactNode } from 'react'
import { PopupContext } from '../Popup/Popup.component'

export const PopupTrigger = (props: HTMLAttributes<HTMLDivElement>): ReactNode => {
  const popup = useContext(PopupContext)

  return <div {...props} style={{ display: 'contents' }} onClick={popup.toggle}></div>
}
