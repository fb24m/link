'use client'

import { useContext, type HTMLAttributes, type ReactNode } from 'react'
import styles from './PopupWrapper.module.scss'
import { PopupContext } from '../Popup/Popup.component'
import { clsx } from '@/functions/clsx'
import Icon from '../Icon/Icon.component'
import { Button } from '../Button/Button.component'

export const PopupWrapper = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>): ReactNode => {
	const popup = useContext(PopupContext)

	return <div className={`${styles.popup} ${popup.wrapperClassName} ${popup.wrapperClassName}`}>
		<div className={clsx(styles.window, className)} {...props}>
			{popup.topCloseButton &&
				<div className={styles.popupHeader}>
					<Button onClick={popup.togglePopupClassList} className={styles.topCloseButton}>
						<Icon icon="close"></Icon>
					</Button>
				</div>
			}
			{children}
		</div>
	</div>
}
