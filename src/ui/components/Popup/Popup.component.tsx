'use client'

import React, { useState, type HTMLAttributes, type ReactNode, createContext } from 'react'

export const PopupContext = createContext({
  toggle: (): void => {},
  open: (): void => {},
  close: (): void => {},
  topCloseButton: false,
  opened: false,
})

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  topCloseButton?: boolean
}

export const Popup = ({ className, topCloseButton = false, ...props }: PopupProps): ReactNode => {
  const [opened, setOpened] = useState<boolean>(false)

  const toggle = (): void => setOpened(prev => !prev)
  const close = () => setOpened(false)
  const open = () => setOpened(true)

  return (
    <PopupContext.Provider value={{ toggle, open, close, topCloseButton, opened }}>
      <div className={className} {...props}></div>
    </PopupContext.Provider>
  )
}
