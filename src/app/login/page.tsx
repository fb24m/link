import type { ReactElement } from 'react'

import styles from '@/shared/styles/forms.module.scss'
import type { Metadata } from 'next'
import { Card } from '@/ui/components/Card/Card.component'
import { LoginForm } from '@/features/LoginForm/LoginForm'
import { Logo } from '@/components/Logo/Logo.component'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Вход - NextLink',
  description: 'Войдите в аккаунт на NextLink, чтобы смотреть читать посты и подписываться на друзей',
  openGraph: {
    title: 'Вход - NextLink',
    description: 'Войдите в аккаунт на NextLink, чтобы смотреть читать посты и подписываться на друзей',
  },
}

const Welcome = async (): Promise<ReactElement> => {
  return (
    <div className={styles.login}>
      <div className={styles.content}>
        <div className={styles.welcome}>
          <div className={styles.greeting}>
            <Logo inverted />
          </div>

          <div className={styles.advantagesBlock}>
            <h1 className={styles.title}>Привет</h1>

            <div className={styles.advantages}>
              <Card className={styles.advantage}>
                <h3 className={styles.advantageTitle}>Открытые профили</h3>
                <p className={styles.advantageDescription}>
                  Вы можете делиться любыми статьями с&nbsp;друзьями без&nbsp;мыслей о&nbsp;том, сможет ли он ее
                  прочитать
                </p>
              </Card>
              <Card className={styles.advantage}>
                <h3 className={styles.advantageTitle}>Безопасность</h3>
                <div className={styles.advantageDescription}>Все ваши данные под самой надежной защитой.</div>
              </Card>
              <Card className={styles.advantage}>
                <h3 className={styles.advantageTitle}>Мини-приложения</h3>
                <p className={styles.advantageDescription}>
                  Бесконечный простор для&nbsp;разработки новых возможностей NextLink
                </p>
              </Card>
              <Card className={styles.advantage}>
                <h3 className={styles.advantageTitle}>Свобода действий</h3>
                <p className={styles.advantageDescription}>
                  Удаляйте, изменяйте и&nbsp;пишите посты когда захотите, меняйте свой профиль под&nbsp;себя
                </p>
              </Card>
            </div>
          </div>

          <div className={styles.info}>
            <Link className={styles.author} href='https://www.fb24m.ru/'>
              developed by fb24m
            </Link>
            <span className={styles.years}>2023-2025</span>
          </div>
        </div>
      </div>

      <div className={styles.loginBlock}>
        <h2 className={styles.loginTitle}>Давайте начнём</h2>

        <LoginForm />
      </div>
    </div>
  )
}

export default Welcome
