import type { ReactElement } from 'react'

import styles from './page.module.css'

import { Title1 } from '@/shared/ui/Title1'
import { UpdateGemini } from '@/entities/profile/UpdateGemini/UpdateGemini'
import { users } from '@/shared/api/users'
import { Button } from '@/shared/ui/Button/Button.component'

const ProfileSetting = async (): Promise<ReactElement> => {
  const gemini = await users.geminiReady()

  return (
    <div>
      <div className={styles.header}>
        <Button as="link" className={styles.back} appearance="transparent" icon="arrow_back" href="/profile">
          В профиль
        </Button>
      </div>

      <Title1 className={styles.title}>Настройки Gemini™</Title1>

      <UpdateGemini keyExists={!!gemini} />

      <p>
        Gemini - Google LLC&apos;s Trademark. NextLink is not affiliated with, endorsed by, or sponsored by Google LLC
      </p>
      <br />
      <p>
        API-ключи Google AI Studio используются только для генерации контента по вашей инициативе. После ввода и
        сохранения ключа он никому не передается и надежно хранится
      </p>
    </div>
  )
}

export default ProfileSetting
