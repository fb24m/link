import type { ReactElement } from 'react'
import styles from './page.module.css'

import { Sidebar } from '@/features/Sidebar/Sidebar.component'
import { Container } from '@/components/Container/Container.component'
import { Header } from '@/widgets/Header/Header'
import { Card } from '@/ui/components/Card/Card.component'
import { Posts } from '@/widgets/Posts/Posts'
import { request } from '@/shared/api/helpers/request'
import { Post } from '@prisma/client'
import { users } from '@/shared/api/users'
import { LButton } from '@/shared/ui/LButton/LButton'

const Home = async (): Promise<ReactElement> => {
  let posts = null
  const me = await users.getMe()

  console.log(me)

  if (me) {
    posts = await request<Post[]>('recommendations')
  }

  const id = await users.getId()

  console.log('USER_ID: ', id)

  return (
    <>
      <Header />
      <Container className='main-container'>
        <Sidebar />
        <div className={styles.posts}>
          {posts && posts.length > 0 ? (
            <Posts posts={posts} />
          ) : (
            <Card className={styles.login}>
              Войдите, чтобы просматривать посты своих друзей в ленте
              <div className={styles.buttonBox}>
                <LButton href='/login' appearance='primary'>
                  Войти
                </LButton>
              </div>
            </Card>
          )}
        </div>
      </Container>
    </>
  )
}

export default Home
