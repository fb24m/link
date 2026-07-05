import type { ReactElement } from 'react'

import { Posts } from '@/widgets/Posts/Posts'
import { posts } from '@/shared/api/posts'
import { users } from '@/shared/api/users'

export const dynamic = 'force-dynamic'

const Welcome = async (): Promise<ReactElement> => {
  const user = await users.getMe()

  console.log(user)

  const myposts = await posts.getMine()

  return <Posts controls author={user} posts={myposts ? myposts.filter(post => !post.deleted) : []} />
}

export default Welcome
