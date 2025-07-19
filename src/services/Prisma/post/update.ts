'use server'

import { prisma } from '@/services/Prisma.service'
import { Post } from '@prisma/client'

export const updatePost = async (
  id: number,
  newContent: string
): Promise<Post> => {
  return await prisma.post.update({
    where: { id },
    data: { content: newContent },
  })
}
