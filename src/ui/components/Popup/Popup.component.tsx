'use client'

import React, { useState, type HTMLAttributes, type ReactNode, createContext } from 'react'
import styles from './Popup.module.scss'

export const PopupContext = createContext({
	togglePopupClassList: (): void => { },
	popupClassList: '',
	wrapperClassName: '',
	topCloseButton: false
})

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
	topCloseButton?: boolean
}

export const Popup = ({ className, topCloseButton = false, ...props }: PopupProps): ReactNode => {
	const [popupClassList, setPopupClassList] = useState('')

	const togglePopupClassList = (): void => {
		popupClassList === '' ? setPopupClassList(styles.opened + " opened-popup") : setPopupClassList('')
	}

	return <PopupContext.Provider value={{ togglePopupClassList, popupClassList, wrapperClassName: styles.wrapper, topCloseButton }}>
		<div className={`${styles.popup} ${className} ${popupClassList}`} {...props}></div>
	</PopupContext.Provider>
}
