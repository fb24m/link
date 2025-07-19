import type { ReactElement, ReactNode } from 'react'

import type { Metadata } from 'next'
import { Container } from '@/components/Container/Container.component'
import { UserProfile } from '@/widgets/UserProfile/UserProfile.component'
import { notFound } from 'next/navigation'
import styles from './page.module.scss'
import { users } from '@/shared/api/users'
import { posts } from '@/shared/api/posts'

export const revalidate = 3600

export const generateMetadata = async (props: {
  params: Promise<{ username: string }>
}): Promise<Metadata> => {
  const { username } = await props.params
  const { bio } = await users.get(username)

  return {
    title: `Профиль ${username} в NextLink`,
    description: bio ?? 'Описание отсутствует',
    openGraph: {
      title: `Профиль ${username} в NextLink`,
      description: bio ?? 'Описание отсутствует',
    },
  }
}

const Welcome = async ({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ username: string }>
}): Promise<ReactElement> => {
  const user = await users.get((await params).username)

  if (!user) notFound()

  const myposts = await posts.getByAuthorId(user.id)

  if (!myposts.length) return <Container />

  return (
    <div className={styles.user}>
      <UserProfile user={user} postsCount={myposts.length} />
      {children}
    </div>
  )
}

export default Welcome
