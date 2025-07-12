'use client'

import { useContext, type HTMLAttributes, type ReactNode } from 'react'
import styles from './PopupFooter.module.scss'
import { PopupContext } from '../Popup/Popup.component'
import { Button } from '../Button/Button.component'

export const PopupFooter = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>): ReactNode => {
	const popup = useContext(PopupContext)

	return (
		<div className={`${className} ${styles.footer}`} {...props}>
			<div onClick={() => { popup.togglePopupClassList() }}>
				<Button appearance="secondary">Закрыть</Button>
			</div>
			{children}
		</div>
	)
}
