'use client'

import { Input } from '@/ui/components/Input/Input'
import styles from './ChangePasswordForm.module.css'
import { Button } from '@/ui/components/Button/Button.component'
import { useActionState } from 'react'
import { changePassword } from './changePassword'

export const ChangePasswordForm = () => {
  const [message, changePasswordAction] = useActionState(changePassword, null)

  return (
    <form action={changePasswordAction} className={styles.form}>
      <Input
        type='password'
        name='current-password'
        autoComplete='current-password'
        placeholder='Старый пароль'
      />
      <Input
        type='password'
        name='new-password'
        autoComplete='new-password'
        placeholder='Новый пароль'
      />
      <Input
        type='password'
        name='repeat-new-password'
        autoComplete='new-password'
        placeholder='Повторите пароль'
      />
      <div className={styles.buttons}>
        {message}
        <Button appearance='primary'>Сохранить</Button>
      </div>
    </form>
  )
}
