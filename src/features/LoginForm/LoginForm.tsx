'use client'

import { Box } from '@/ui/components/Box/Box.component'
import styles from './LoginForm.module.scss'
import { login } from '@/actions/login.action'
import { useActionState } from 'react'
import { Card } from '@/ui/components/Card/Card.component'
import { Button } from '@/ui/components/Button/Button.component'

export const LoginForm = () => {
  const [loginSuccessful, loginAction] = useActionState(login, null)

  return (
    <div className={styles.wrapper}>
      <form action={loginAction}>
        <Box alignItems='stretch'>
          <span className={styles.inputWrapper}>
            <input
              className={styles.input}
              type='text'
              placeholder='Введите эл. почту'
              name='email'
              autoComplete='email'
            />
          </span>

          {loginSuccessful?.message && <Card className={styles.loginError}>{loginSuccessful.message}</Card>}

          <Button loader='skeleton' appearance='primary' className={styles.button}>
            Продолжить
          </Button>
        </Box>
      </form>
    </div>
  )
}
