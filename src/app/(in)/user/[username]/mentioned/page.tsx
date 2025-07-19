import type { ReactElement } from 'react'

import { Posts } from '@/widgets/Posts/Posts'
import { users } from '@/shared/api/users'
import { prisma } from '@/services/Prisma.service'

const Welcome = async ({ params }: { params: Promise<{ username: string }> }): Promise<ReactElement> => {
  const { username } = await params

  const user = await users.get(username)

  const mentions = await prisma.postMention.findMany({ where: { userId: user.id }, select: { postId: true } })

  const postIds = mentions.map(mention => mention.postId)

  const posts = await prisma.post.findMany({ where: { id: { in: postIds }, deleted: false } })

  return <Posts whoMentioned={username} posts={posts} />
}

export default Welcome
