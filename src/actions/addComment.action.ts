'use server'

import { exists } from '@/functions/exists'
import { prisma } from '@/services/Prisma.service'
import { revalidatePath } from 'next/cache'
import { users } from '@/shared/api/users'

export const addComment = async (formData: FormData): Promise<void> => {
  const rawData = { text: exists<string>(formData.get('text') as string), post: exists(formData.get('post-id')) }

  const { userId } = await users.getId()

  await prisma.comment.create({ data: { postId: +rawData.post, authorId: userId, content: rawData.text } })

  revalidatePath(`/article/${+rawData.post}`)
}
