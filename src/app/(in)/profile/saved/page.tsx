import type { ReactElement } from 'react'

import { Container } from '@/components/Container/Container.component'
import { Posts } from '@/widgets/Posts/Posts'
import { getPosts } from '@/services/Prisma/post/getPosts'
import { users } from '@/shared/api/users'
import { PostType } from '@/shared/api/posts'

const Welcome = async (): Promise<ReactElement> => {
  const user = await users.getMe()

  const savedPosts = user?.savedArticles?.split('/')
  const items = savedPosts?.map((item: string) => +item.replace('/', '')).filter((item: number) => !isNaN(item))

  const posts = await getPosts(typeof items !== 'undefined' ? { id: items } : { id: [0] })

  if (!posts.ok || !posts.data) return <Container>{posts.message}</Container>

  return <Posts posts={posts.data as PostType[]} />
}

export default Welcome
