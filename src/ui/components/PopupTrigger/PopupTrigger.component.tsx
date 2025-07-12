'use client'

import { useContext, type HTMLAttributes, type ReactNode } from 'react'
import { PopupContext } from '../Popup/Popup.component'

export const PopupTrigger = ({ onClick, ...props }: HTMLAttributes<HTMLDivElement>): ReactNode => {
	const popup = useContext(PopupContext)

	return (
		<div style={{ display: 'contents' }} onClick={() => { popup.togglePopupClassList() }} {...props}></div>
	)
}
