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

export const metadata: Metadata = {
  title: 'Регистрация - NextLink',
  description: 'Зарегистрируйтесь на NextLink, чтобы смотреть читать посты и подписываться на друзей',
  openGraph: {
    title: 'Регистрация - NextLink',
    description: 'Зарегистрируйтесь на NextLink, чтобы смотреть читать посты и подписываться на друзей',
  },
}

const Signup = async (): Promise<ReactElement> => {
  return (
    <div className="flex grow items-center">
      <Container className={twMerge(styles.container)}>
        <Card className={twMerge(styles.card, 'flex-col p-12! pt-10! rounded-4xl!')}>
          <Logo />

          <div className="flex mt-8">
            <Box className={styles.box} gap={16}>
              <Title1 className="font-normal">Регистрация</Title1>
              <Body1>Создание нового аккаунта в NextLink</Body1>
            </Box>
            <Box className={styles.box} alignItems="center" gap={16}>
              <RegisterForm />
            </Box>
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
