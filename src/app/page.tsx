import type { ReactElement } from 'react'
import styles from './page.module.scss'
import type { IPost } from '@/interfaces/IPost.interface'
import { exists } from '../functions/exists'

import { Posts } from '@/components/Posts/Posts.component'
import { getPosts } from '@/services/Prisma/post/getPosts'
import { Sidebar } from '@/components/Sidebar/Sidebar.component'
import { getCurrentAuth } from '@/services/Prisma/user/getCurrentAuth'
import { Container } from '@/components/Container/Container.component'
import { Header } from '@/components/Header/Header.component'
import { posts } from '@/shared/api/posts'

const Home = async (): Promise<ReactElement> => {
  const user = await getCurrentAuth()

  const subsribedTo: number[] =
    exists(user?.data?.subscribedTo?.split(',').filter(item => exists(item) !== '' && !isNaN(+item)).map(item => +item))
  const thisposts = (await posts.getByAuthorsIds(subsribedTo))

  console.log(thisposts)

  return (
    <>
      <Header />
      <Container className="main-container">
        {typeof user !== 'undefined' ? <Sidebar></Sidebar> : ''}
        <div className={styles.posts}>
          {typeof user !== 'undefined'
            ? <Posts posts={thisposts} />
            : 'Войдите, чтобы просматривать посты своих друзей в ленте'}
        </div>
      </Container>
    </>
  )
}

export default Home
