import type { ReactElement } from 'react'
import styles from './page.module.scss'
import type { IPost } from '@/interfaces/IPost.interface'
import { exists } from '../../functions/exists'

import { Posts } from '@/components/Posts/Posts.component'
import { Container } from '@/components/Container/Container.component'
import { getPosts } from '@/services/Prisma/post/getPosts'
import { parseUser } from '@/functions/parseUser'

const Home = async (): Promise<ReactElement> => {
  const user = await parseUser(false)
  const subsribedTo: number[] =
    exists(user?.data?.subscribedTo?.split(',').filter(item => exists(item) !== '' && !isNaN(+item)).map(item => +item))
  const posts = exists<IPost[]>((await getPosts({ authorId: subsribedTo })).data)

  console.log('posts', posts)

  console.log(user)

  return (
    <Container className={styles.posts}>
      {typeof user !== 'undefined'
        ? <Posts posts={posts} />
        : 'Войдите, чтобы просматривать посты своих друзей в ленте'}
    </Container>
  )
}

export default Home
