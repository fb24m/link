'use client'

import { SubmitButton } from '@/components/SubmitButton/SubmitButton.component'
import { Box } from '@/ui/components/Box/Box.component'
import { Button } from '@/ui/components/Button/Button.component'
import styles from './LoginForm.module.scss'
import { login } from '@/actions/login.action'
import { useActionState } from 'react'
import { Card } from '@/ui/components/Card/Card.component'

export const LoginForm = () => {
	const [loginSuccessful, loginAction] = useActionState(login, null)

	return (
		<div className={styles.wrapper}>
			<form action={loginAction}>
				<Box alignItems="stretch">
					<span className={styles.inputWrapper}>
						<input
							className={styles.input}
							type="text"
							placeholder="Имя пользователя"
							name="username"
							autoComplete="firstName"
						/>
					</span>
					<span className={styles.inputWrapper}>
						<input
							className={styles.input}
							type="password"
							placeholder="Пароль"
							name="password"
							autoComplete="current-password"
						/>
					</span>

					{loginSuccessful?.message &&
						<Card className={styles.loginError}>
							{loginSuccessful.message}
						</Card>
					}

					<SubmitButton className={styles.button} icon="login">Войти</SubmitButton>
				</Box>
			</form>

			<Box className={styles.box} direction="row" justifyContent="space-between">
				<Button appearance="link" href="/signup">Регистрация</Button>
				<Button appearance="link" href="/restore">Забыли пароль?</Button>
			</Box>
		</div>
	)
}