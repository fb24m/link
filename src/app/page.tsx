import type { ReactElement } from 'react'
import styles from './page.module.css'
import { exists } from '../functions/exists'

import { Posts } from '@/components/Posts/Posts.component'
import { Sidebar } from '@/features/Sidebar/Sidebar.component'
import { getCurrentAuth } from '@/services/Prisma/user/getCurrentAuth'
import { Container } from '@/components/Container/Container.component'
import { Header } from '@/components/Header/Header.component'
import { posts } from '@/shared/api/posts'
import { Card } from '@/ui/components/Card/Card.component'
import { Button } from '@/ui/components/Button/Button.component'

const Home = async (): Promise<ReactElement> => {
  const user = await getCurrentAuth()

  // const subsribedTo: number[] =
  //   exists(user?.data?.subscribedTo?.split(',').filter(item => exists(item) !== '' && !isNaN(+item)).map(item => +item))

  // const thisposts = await posts.getByAuthorsIds(subsribedTo && subsribedTo.length ? subsribedTo : [0])

  return (
    <>
      <Header />
      <Container className="main-container">
        {typeof user !== 'undefined' && <Sidebar />}
        <div className={styles.posts}>
          {/* {thisposts && thisposts.length
            ? <Posts posts={thisposts} />
            : <Card className={styles.login}>
              Войдите, чтобы просматривать посты своих друзей в ленте
              <div className={styles.buttonBox}>
                <Button href="/login" appearance="primary">Войти</Button>
              </div>
            </Card>} */}
          <Card className={styles.login}>Этот функционал пока в разработке</Card>
        </div>
      </Container>
    </>
  )
}

export default Home
