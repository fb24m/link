import type { ReactElement } from 'react'

import { Posts } from '@/widgets/Posts/Posts'
import { users } from '@/shared/api/users'
import { posts } from '@/shared/api/posts'

const Mentioned = async ({ params }: { params: Promise<{ username: string }> }): Promise<ReactElement> => {
  const { username } = await params

  const user = await users.get(username)

  const myposts = await posts.getByMention(user.id)

  return <Posts whoMentioned={username} posts={myposts} />
}

export default Mentioned
