'use server'

import { exists } from '@/functions/exists'
import { prisma } from '@/services/Prisma.service'
import { revalidatePath } from 'next/cache'

export const movePostToDeleted = async (formData: FormData): Promise<void> => {
  const id = +exists(formData.get('post-id'))

  await prisma.post.update({
    where: {
      id,
    },
    data: {
      deleted: true,
    },
  })
  revalidatePath('/profile')
}
