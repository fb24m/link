import type { ReactElement } from 'react'
import styles from './page.module.css'

import { Sidebar } from '@/features/Sidebar/Sidebar.component'
import { Container } from '@/components/Container/Container.component'
import { Header } from '@/widgets/Header/Header'
import { Posts } from '@/widgets/Posts/Posts'
import { users } from '@/shared/api/users'
import { redirect } from 'next/navigation'
import { posts } from '@/shared/api/posts'

const Home = async (): Promise<ReactElement> => {
  const me = await users.getMe()
  if (!me) redirect('/login')

  const notposts = await posts.getRecommendations()

  return (
    <>
      <Header />
      <Container className='main-container'>
        <Sidebar />
        <div className={styles.posts}>{notposts && notposts.length > 0 && <Posts posts={notposts} />}</div>
      </Container>
    </>
  )
}

export default Home
