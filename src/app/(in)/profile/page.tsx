import type { ReactElement } from 'react'

import { Posts } from '@/widgets/Posts/Posts'
import { posts } from '@/shared/api/posts'
import { users } from '@/shared/api/users'

const Welcome = async (): Promise<ReactElement> => {
  const { userId } = (await users.getId()) ?? 0
  const user = await users.get(userId)

  const myposts = await posts.getByAuthorId(userId)

  return <Posts controls author={user} posts={myposts ? myposts.filter(post => !post.deleted) : []} />
}

export default Welcome
