'use client'

import type { ReactNode } from 'react'
import styles from './ChangeAvatarPopup.module.scss'
import { Button } from '@/ui/components/Button/Button.component'
import { Popup } from '@/ui/components/Popup/Popup.component'
import { PopupWrapper } from '@/ui/components/PopupWrapper/PopupWrapper.component'
import { PopupFooter } from '@/ui/components/PopupFooter/PopupFooter.component'
import { PopupTrigger } from '@/ui/components/PopupTrigger/PopupTrigger.component'
import { Eval } from '@/components/Eval/Eval.component'

export interface CustomPopupProps {
	buttonContent: ReactNode
}

const ChangeAvatarPopup = (props: CustomPopupProps): ReactNode => {
	return (
		<Popup className={styles.popup}>
			<PopupWrapper>
				<Eval>
					<p>
						Как изменить аватар?
					</p>
					<ol>
						<li>Зарегистрируйтесь на сайте <a target="_blank" rel="noreferrer" href="https://gravatar.com">gravatar.com</a>, используя ту же почту, которую использвали для регистрации в NextLink</li>

						<li>Загрузите аватар и заполните профиль в Gravatar</li>

						<li>Готово! Загрузка аватара в NextLink может занять до 15 минут</li>
					</ol>
				</Eval>
				<PopupFooter></PopupFooter>
			</PopupWrapper>
			<PopupTrigger>
				<Button className={styles.changeButton}>{props.buttonContent}</Button>
			</PopupTrigger>
		</Popup>
	)
}

export default ChangeAvatarPopup
