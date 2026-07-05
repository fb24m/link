import type { ReactElement } from 'react'
import { users } from '@/shared/api/users'
import { Button } from '@/shared/ui/Button/Button.component'

export const Profile = async (): Promise<ReactElement> => {
  const { username } = await users.getMe()

  return (
    <Button
      as="link"
      appearance="transparent"
      icon="account_circle"
      href="/profile"
      className="font-medium text-xs md:text-sm"
    >
      {username ?? 'Войти'}
    </Button>
  )
}
