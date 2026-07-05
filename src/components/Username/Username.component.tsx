import type { ReactElement } from 'react'
import Icon from '@/ui/components/Icon/Icon.component'
import { users } from '@/shared/api/users'
import { Button } from '@/shared/ui/Button/Button.component'
import { twMerge } from 'tailwind-merge'

export interface UsernameProps {
  id: number
  avatar?: boolean
  className?: string
}

export const Username = async ({ id, avatar, className }: UsernameProps): Promise<ReactElement> => {
  const user = await users.get(id)

  return (
    <Button
      as="link"
      href={`/user/${user?.username}`}
      appearance="transparent"
      className={twMerge('p-0.75', className)}
    >
      {avatar && user?.avatar && <img src={user?.avatar} className="bg-white w-5.5 h-5.5 appearance-none rounded-sm" />}
      {!user?.avatar && <Icon icon="account_circle" className="text-2xl" />}
      {user?.username}
    </Button>
  )
}
