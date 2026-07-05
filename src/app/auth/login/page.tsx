import { type ReactElement } from 'react'

import styles from '@/shared/styles/forms.module.scss'
import { Box } from '@/ui/components/Box/Box.component'
import type { Metadata } from 'next'
import { Container } from '@/shared/ui/Container'
import { Card } from '@/ui/components/Card/Card.component'
import { Title1 } from '@/shared/ui/Title1'
import { Button } from '@/shared/ui/Button/Button.component'
import { RegisterForm } from '@/features/RegisterForm/RegisterForm'
import { twMerge } from 'tailwind-merge'
import { Body1 } from '@/ui/components/Body1/Body1.component'
import { Logo } from '@/components/Logo/Logo.component'
import { PasswordForm } from '@/features/PasswordForm/PasswordForm'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Вход в аккаунт NextLink',
  description: 'Зарегистрируйтесь на NextLink, чтобы смотреть читать посты и подписываться на друзей',
}

const Signup = async (): Promise<ReactElement> => {
  const cookie = await cookies()

  return (
    <div className="flex grow items-center">
      <Container className={twMerge(styles.container)}>
        <Card className={twMerge(styles.card, 'flex min-h-90 flex-col p-12! pt-10! rounded-4xl!')}>
          <Logo />

          <div className="flex mt-8 grow">
            <Box className={styles.box} gap={16}>
              <Title1 className="font-normal">Введите пароль</Title1>
              <Body1>Для входа в ваш аккаунт NextLink</Body1>
            </Box>
            <PasswordForm email={cookie.get('auth-email')?.value ?? ''} />
          </div>
        </Card>

        <Box
          className={twMerge(styles.box, 'mt-4 opacity-50 text-sm')}
          gap={16}
          direction="row"
          justifyContent="center"
        >
          <Button as="link" appearance="link" href="/login">
            Вход
          </Button>
          <Button appearance="link">Персональные данные</Button>
        </Box>
      </Container>
    </div>
  )
}

export default Signup
