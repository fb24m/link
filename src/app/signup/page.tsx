import dynamic from 'next/dynamic'
import type { ReactElement } from 'react'

import styles from './page.module.scss'
import { signup } from '@/actions/signup.action'
import { Box } from '@/ui/components/Box/Box.component'

const Container = dynamic(() => import('@/components/Container/Container.component'))
const Input = dynamic(() => import('@/ui/components/Input/Input'))
const Button = dynamic(() => import('@/ui/components/Button/Button.component'))
const Title1 = dynamic(() => import('@/ui/components/Title1/Title1.component'))

const Signup = async (): Promise<ReactElement> => {
	return (
		<Container className={styles.container}>
			<Box className={styles.box} alignItems="center" gap={16}>
				<Title1 className={styles.title}>Регистрация</Title1>
				<form action={signup}>
					<Box alignItems="stretch">
						<Input required type="email" placeholder="Эл. почта" name="email" autoComplete="email" />
						<Input required type="text" placeholder="Придумайте имя пользователя" name="username" autoComplete="username" />
						<Input required type="password" placeholder="Придумайте пароль" name="password" autoComplete="new-password" />
						<Input required type="password" placeholder="Повторите пароль" name="repeat-password" autoComplete="new-password" />
						<Button type="submit" appearance="primary">Регистрация</Button>
					</Box>
				</form>
				<Box direction="row" justifyContent="space-between">
					<Button appearance="link">Вход</Button>
					<Button appearance="link">Персональные данные</Button>
				</Box>
			</Box>
		</Container>
	)
}

export default Signup
