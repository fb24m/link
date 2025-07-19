import type { ReactElement } from 'react'

import { redirect } from 'next/navigation'
import styles from './page.module.css'

import { Title1 } from '@/ui/components/Title1/Title1.component'
import { Card } from '@/ui/components/Card/Card.component'

import { ChangePasswordForm } from '@/features/profile-settings/ChangePasswordForm/ChangePasswordForm'
import { ChangeUsernameForm } from '@/features/profile-settings/ChangeUsernameForm/ChangeUsernameForm'
import { LogoutPopup } from '@/features/profile-settings/Logout/LogoutPopup/LogoutPopup'
import { users } from '@/shared/api/users'
import { LButton } from '@/shared/ui/LButton/LButton'

const ProfileSetting = async (): Promise<ReactElement> => {
  const userId = await users.getId()

  if (!userId) {
    redirect('/login')
  }

  return (
    <div>
      <div className={styles.header}>
        <LButton className={styles.back} appearance='transparent' icon='arrow_back' href='/profile'>
          В профиль
        </LButton>
      </div>

      <Title1 className={styles.title}>Настройки</Title1>

      <div className={styles.grid}>
        <div className={styles.cards}>
          <Card>
            <h2 className={styles.title2}>Изменить пароль</h2>
            <ChangePasswordForm />
          </Card>
        </div>
        <div className={styles.cards}>
          <Card>
            <h2 className={styles.title2}>Изменить имя пользователя</h2>
            <ChangeUsernameForm />
          </Card>
          <Card className={styles.block}>
            <h2 className={styles.title2}>Ссылки</h2>
            {/* <LinksPopup userLinks={links} /> */}
          </Card>
        </div>
      </div>
      <Card className={styles.logout}>
        <h2 className={styles.title2}>Выход из аккаунта</h2>
        <LogoutPopup />
      </Card>

      {/* <Card className={styles.dangerous}>
        <details className={styles.details}>
          <summary className={styles.title2}>
            <span className={`${styles.detailsClosedTitle} ${styles.title2}`}>
              Другое
            </span>
            <span className={`${styles.detailsOpenedTitle} ${styles.title2}`}>
              Удаление профиля
            </span>
          </summary>

          <div className={styles.deleteButton}>
            <DeleteProfilePopup />
          </div>
        </details>
      </Card> */}
    </div>
  )
}

export default ProfileSetting
