import type { ReactElement } from 'react'

import { Posts } from '@/widgets/Posts/Posts'
import { users } from '@/shared/api/users'
import { posts } from '@/shared/api/posts'

export const revalidate = 31536000

const Welcome = async (): Promise<ReactElement> => {
  const user = await users.getMe()

  const deletedPosts = await posts.getDeleted()

  return <Posts restore controls posts={deletedPosts} author={user} />
}

export default Welcome
