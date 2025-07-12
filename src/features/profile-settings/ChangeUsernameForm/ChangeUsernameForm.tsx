'use client'

import { Input } from '@/ui/components/Input/Input'
import styles from './ChangeUsernameForm.module.css'
import { useActionState } from 'react'
import { changeUsername } from './changeUsername'
import { SubmitButton } from '@/components/SubmitButton/SubmitButton.component'

export const ChangeUsernameForm = () => {
	const [message, changeUsernameAction] = useActionState(changeUsername, null)

	return (
		<form action={changeUsernameAction} className={styles.form}>
			<Input
				type="text"
				name="username"
				autoComplete="username"
				placeholder="Имя пользователя"
			/>
			<div className={styles.buttons}>
				{message}
				<SubmitButton appearance="primary">Сохранить</SubmitButton>
			</div>
		</form>
	)
}