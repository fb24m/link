'use client'

import { Box } from '@/ui/components/Box/Box.component'
import { Input } from '@/shared/ui/Input/Input'
import styles from '@/shared/styles/forms.module.scss'
import { Button } from '@/shared/ui/Button/Button.component'
import { register } from './register'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'
const messages: Record<string, string> = {
  noEmail: 'Почта не найдена. Попробуйте ещё раз',
  usernameTaken: 'Такое имя пользователя недоступно. Попробуйте другое',
  wrongTok: 'Срок действия ссылки истёк. Запросите новую ссылку',
  validationFailed:
    'Не удалось проверить форму. Убедитесь, что пароли совпадают, а имя пользователя не короче 3 и не длиннее 20 символов',
  '': '',
}

export const RegisterForm = () => {
  const params = useSearchParams()
  const token = params.get('verification') ?? ''
  const [state, registerAction] = useActionState(register.bind(null, token), null)

  return (
    <form className={styles.box} action={registerAction}>
      <Box alignItems="stretch">
        <Input type="text" placeholder="Придумайте имя пользователя" name="login" autoComplete="login" />
        <Input type="password" placeholder="Придумайте пароль" name="password" autoComplete="new-password" />
        <Input type="password" placeholder="Повторите пароль" name="repeatPassword" autoComplete="new-password" />
        <div className="text-sm mb-4">{messages?.[state ?? ''] ?? ''}</div>
        <div className="flex justify-end">
          <Button appearance="primary" loader="spinner" icon="send">
            Продолжить
          </Button>
        </div>
      </Box>
    </form>
  )
}
