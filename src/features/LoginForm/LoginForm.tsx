'use client'

import { Box } from '@/ui/components/Box/Box.component'
import styles from './LoginForm.module.scss'
import { login } from './login'
import { useActionState } from 'react'
import { Card } from '@/ui/components/Card/Card.component'
import { Button } from '@/shared/ui/Button/Button.component'

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
              placeholder="Введите эл. почту"
              name="email"
              autoComplete="login"
            />
          </span>

          {loginSuccessful && <Card className={styles.loginError}>{loginSuccessful}</Card>}

          <Button loader="skeleton" appearance="primary" className={styles.button}>
            Продолжить
          </Button>
        </Box>
      </form>
    </div>
  )
}
