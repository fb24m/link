import { type ReactElement } from 'react'

import styles from '@/shared/styles/forms.module.scss'
import type { Metadata } from 'next'
import { prisma } from '@/services/Prisma.service'
import { cookies } from 'next/headers'
import { ConfirmForm } from '@/features/ConfirmForm/ConfirmForm'

export const metadata: Metadata = {
  title: 'Вход - NextLink',
  description: 'Войдите в аккаунт на NextLink, чтобы смотреть читать посты и подписываться на друзей',
  openGraph: {
    title: 'Вход - NextLink',
    description: 'Войдите в аккаунт на NextLink, чтобы смотреть читать посты и подписываться на друзей',
  },
}

const Welcome = async (): Promise<ReactElement> => {
  const cookie = await cookies()

  const isUserExists = !!(await prisma.user.findUnique({ where: { email: cookie.get('temp_email')?.value } }))

  return (
    <div className={styles.login}>
      <ConfirmForm isUserExists={isUserExists} email={cookie.get('temp_email')?.value ?? ''} />
    </div>
  )
}

export default Welcome
