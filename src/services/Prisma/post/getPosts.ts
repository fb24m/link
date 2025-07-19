'use server'

import { Post } from '@prisma/client'
import { prisma } from '../../Prisma.service'
import type { IResponse } from '@/shared/interfaces/IResponse.interface'

interface IPostWhere {
  authorId?: number[]
  id?: number[]
}

export const getPosts = async (
  where: IPostWhere,
  maxPosts: number = 100
): Promise<IResponse<Post[]>> => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: { in: where.authorId },
        id: {
          in: where.id,
        },
        deleted: false,
      },
      take: 100,
      orderBy: {
        publishDate: 'asc',
      },
    })

    return { ok: true, message: 'success', code: 200, data: posts }
  } catch {
    return { ok: false, message: 'posts not found', code: 404 }
  }
}
