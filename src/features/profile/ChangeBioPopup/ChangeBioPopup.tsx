'use client'

import type { ReactNode } from 'react'
import styles from './ChangeBioPopup.module.scss'
import Textarea from '@/ui/components/Textarea/Textarea.component'
import { updateBio } from '@/actions/updateBio.action'
import { SubmitButton } from '@/components/SubmitButton/SubmitButton.component'
import { Button } from '@/ui/components/Button/Button.component'
import { Popup } from '@/ui/components/Popup/Popup.component'
import { PopupWrapper } from '@/ui/components/PopupWrapper/PopupWrapper.component'
import { PopupFooter } from '@/ui/components/PopupFooter/PopupFooter.component'
import { PopupTrigger } from '@/ui/components/PopupTrigger/PopupTrigger.component'

export interface CustomPopupProps {
	buttonText: string
	currentBio: string | null | undefined
}

const ChangeBioPopup = (props: CustomPopupProps): ReactNode => {
	return (
		<Popup className={styles.popup}>
			<PopupWrapper>
				<form action={updateBio}>
					<Textarea name="new-bio" defaultValue={props.currentBio !== null ? props.currentBio : ''}></Textarea>
					<PopupFooter>
						<SubmitButton>Сохранить</SubmitButton>
					</PopupFooter>
				</form>
			</PopupWrapper>
			<PopupTrigger>
				<Button className={styles.changeButton}>{props.buttonText}</Button>
			</PopupTrigger>
		</Popup>
	)
}

export default ChangeBioPopup
