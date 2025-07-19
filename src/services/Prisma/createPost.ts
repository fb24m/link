'use server'

import { prisma } from '../Prisma.service'
import { Post } from '@prisma/client'

export const createPost = async (content: string, authorId: number): Promise<Post> => {
  return await prisma.post.create({
    data: { content: content.split('\r\n').join('<br>'), authorId, writtenBy: authorId },
  })
}
