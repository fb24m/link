'use client'

import { auth } from '@/actions/auth/auth.action'
import { useActionState } from 'react'
import styles from './ConfirmForm.module.scss'
import { Input } from '@/ui/components/Input/Input'
import { Button } from '@/ui/components/Button/Button.component'
import { clsx } from '@/functions/clsx'

export const ConfirmForm = ({
  isUserExists,
  email,
}: {
  isUserExists: boolean
  email: string
}) => {
  const [message, action] = useActionState(auth, '')

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginBlock}>
        {isUserExists ? (
          <>
            <h2 className={styles.loginTitle}>Введите пароль</h2>

            <form action={action}>
              <Input
                className={styles.input}
                type='password'
                name='password'
                autoComplete='password'
              />
              <span className={styles.message}>{message}</span>

              <Button
                className={styles.button}
                appearance='primary'
                size='lg'
                icon='login'
              >
                Войти
              </Button>
            </form>
          </>
        ) : (
          <>
            <h2 className={styles.loginTitle}>Подтверждение</h2>
            <p className={styles.description}>
              Мы отправили код подтверждения на почту {email}. Введите его в
              поле ниже:
            </p>

            <form action=''>
              <Input
                className={clsx(styles.input, styles.confirmation)}
                type='text'
                name='code'
                placeholder=''
              />

              <Button
                className={styles.button}
                appearance='primary'
                size='lg'
                icon='login'
              >
                Войти
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
