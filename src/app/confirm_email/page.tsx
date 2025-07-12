import type { ReactNode } from 'react'

import styles from '@/scss/forms.module.scss'
import { Box } from '@/ui/components/Box/Box.component'
import { confirmEmail } from '@/actions/confirmEmail.action'
import { Container } from '@/components/Container/Container.component'
import { Card } from '@/ui/components/Card/Card.component'
import { Title1 } from '@/ui/components/Title1/Title1.component'
import { Input } from '@/ui/components/Input/Input'
import { SubmitButton } from '@/components/SubmitButton/SubmitButton.component'
import { Button } from '@/ui/components/Button/Button.component'

const ConfirmEmail = (): ReactNode => {
	return (
		<Container className={styles.container}>
			<Card className={styles.card}>
				<Box className={styles.box} alignItems="center" gap={16}>
					<Title1 className={styles.title}>Подтверждение почты</Title1>
					<p>На почту был отправлен шестизначный код подтверждения. Укажите его, чтобы подтвердить что указанная почта действительно принадлежит вам</p>
					<form className={styles.box} action={confirmEmail}>
						<Box alignItems="stretch">
							<Input placeholder="Код подтверждения" name="code" autoComplete="off" />
							<SubmitButton>Подтвердить</SubmitButton>
						</Box>
					</form>
					<Box className={styles.box} direction="row" justifyContent="space-between">
						<Button appearance="link">Регистрация</Button>
						<Button appearance="link">Забыли пароль?</Button>
					</Box>
				</Box>
			</Card>
		</Container>
	)
}

export default ConfirmEmail
