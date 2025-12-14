'use server'

import { exists } from '@/functions/exists'
import { prisma } from '@/services/Prisma.service'
import { revalidateTag } from 'next/cache'
import { revalidatePath } from 'next/cache'

export const restorePost = async (formData: FormData): Promise<void> => {
  const id = +exists(formData.get('post-id'))
  const authorId = exists(formData.get('author-id'))

  await prisma.post.update({ where: { id }, data: { deleted: false } })

  revalidateTag(`posts?authorId=${authorId}`, 'max')
  revalidatePath('/profile/deleted')
  revalidatePath('/profile')
}
