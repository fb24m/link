import type { ReactElement } from 'react'
import styles from './Username.module.scss'
import Icon from '@/ui/components/Icon/Icon.component'
import { clsx } from '@/functions/clsx'
import { users } from '@/shared/api/users'
import { LButton } from '@/shared/ui/LButton/LButton'

export const Username = async ({
  id,
  avatar,
  className,
}: {
  id: number
  avatar?: boolean
  className?: string
}): Promise<ReactElement> => {
  const user = await users.get(id)

  return (
    <LButton href={`/user/${user?.username}`} appearance='transparent' className={clsx(className, styles.button)}>
      {avatar && user?.avatar ? <img src={user?.avatar} className={styles.avatar} /> : ''}
      {!user?.avatar ? <Icon icon='account_circle' className={styles.avatar_placeholder} /> : ''}
      {user?.username}
    </LButton>
  )
}
