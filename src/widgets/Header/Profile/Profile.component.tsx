import type { ReactElement } from 'react'
import styles from './Profile.module.css'
import { users } from '@/shared/api/users'
import { LButton } from '@/shared/ui/LButton/LButton'

export const Profile = async (): Promise<ReactElement> => {
  const { username } = await users.getId()

  return (
    <LButton appearance='transparent' icon='account_circle' href='/profile' className={styles.profile}>
      {username ?? 'Войти'}
    </LButton>
  )
}
