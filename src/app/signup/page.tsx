import { type ReactElement } from 'react'

import styles from '@/scss/forms.module.scss'
import { signup } from '@/actions/signup.action'
import { Box } from '@/ui/components/Box/Box.component'
import type { Metadata } from 'next'
import { Container } from '@/components/Container/Container.component'
import { Card } from '@/ui/components/Card/Card.component'
import { Title1 } from '@/ui/components/Title1/Title1.component'
import { Input } from '@/ui/components/Input/Input'
import { Button } from '@/ui/components/Button/Button.component'
import { SubmitButton } from '@/components/SubmitButton/SubmitButton.component'

export const metadata: Metadata = {
	title: 'Регистрация - NextLink',
	description: 'Зарегистрируйтесь на NextLink, чтобы смотреть читать посты и подписываться на друзей',
	openGraph: {
		title: 'Регистрация - NextLink',
		description: 'Зарегистрируйтесь на NextLink, чтобы смотреть читать посты и подписываться на друзей'
	}
}

const Signup = async (): Promise<ReactElement> => {
	return (
		<Container className={styles.container}>
			<Card className={styles.card}>
				<Box className={styles.box} alignItems="center" gap={16}>
					<Title1 className={styles.title}>Регистрация (временно отключена)</Title1>
					<form className={styles.box}>
						<Box alignItems="stretch">
							<Input required type="email" placeholder="Эл. почта" name="email" autoComplete="email" />
							<Input required type="text" placeholder="Придумайте имя пользователя" name="username" autoComplete="username" />
							<Input required type="password" placeholder="Придумайте пароль" name="password" autoComplete="new-password" />
							<Input required type="password" placeholder="Повторите пароль" name="repeat-password" autoComplete="new-password" />
							<SubmitButton icon="send">Регистрация</SubmitButton>
						</Box>
					</form>
					<Box className={styles.box} direction="row" justifyContent="space-between">
						<Button appearance="link" href="/login">Вход</Button>
						<Button appearance="link">Персональные данные</Button>
					</Box>
				</Box>
			</Card>
		</Container>
	)
}

export default Signup
