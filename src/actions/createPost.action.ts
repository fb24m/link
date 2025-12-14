'use server'

import { exists } from '@/functions/exists'
import { prisma } from '@/services/Prisma.service'
import { createPost as prisma_createPost } from '@/services/Prisma/createPost'
import { users } from '@/shared/api/users'
import { revalidatePath } from 'next/cache'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export const createPost = async (formData: FormData): Promise<void> => {
  const rawData = {
    content: exists(formData.get('content')) as string,
    writtenBy: exists(formData.get('written-by')) as string,
  }

  const { userId, username } = await users.getId()

  const post = await prisma_createPost(rawData.content.split('<').join('&lt;').split('>').join('&gt;'), userId)

  const mentions = rawData.content.match(/@\w+/g) || []
  const uniqueMentions = [...new Set(mentions.map(item => item.replace('@', '')))]

  if (mentions.length > 0) {
    const mentionedUsers = await prisma.user.findMany({ where: { username: { in: uniqueMentions } } })

    await prisma.postMention.createMany({
      data: [...mentionedUsers.map(user => ({ postId: post.id, userId: user.id }))],
    })
  }

  revalidateTag(`posts`, 'max')
  revalidateTag(`posts?authorId=${userId}`, 'max')
  revalidatePath('/profile', 'layout')
  revalidatePath(`/user/${username}`, 'layout')
  redirect('/profile')
}
