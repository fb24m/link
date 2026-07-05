import { prisma } from '@/services/prisma'
import { users } from '@/shared/api/users'
import { NextRequest } from 'next/server'
import { PostFindManyArgs } from '../../../../generated/prisma/models'
import z from 'zod'
import { route } from '@/shared/utils/route'
import { PostSchema } from '@/shared/shemas/Post'
import { revalidateTag } from 'next/cache'
import { revalidatePath } from 'next/cache'

type PrismaSelect = { [key: string]: boolean }

const postSchema = z.object({ content: PostSchema })

export const POST = route(postSchema, async (_, body, userId): Promise<Response> => {
  const post = await prisma.post.create({ data: { authorId: userId, content: JSON.stringify(body.content) } })

  revalidatePath('/profile')
  revalidateTag('posts/me', 'max')
  revalidateTag(`posts?author=${userId}`, 'max')

  return Response.json(post)
})

export const GET = async (request: NextRequest) => {
  const queryParams = new URLSearchParams(new URL(request.url).search)

  const authorId = queryParams.get('authorId')!
  const mentioned = queryParams.get('mentioned')
  const fields = queryParams
    .get('fields')
    ?.split(',')
    .reduce((acc: PrismaSelect, field) => {
      acc[field] = true
      return acc
    }, {})
  const max = queryParams.get('max')

  const include = fields
    ? { select: { ...fields, _count: { select: { comments: true } } } }
    : { include: { _count: { select: { comments: true } } } }

  const trindets: Partial<PostFindManyArgs> = {
    ...(include as PostFindManyArgs),
    take: max ? Number.parseInt(max) : 100,
    orderBy: {
      publishDate: 'asc', // или id: 'desc'
    },
  }

  if (authorId) {
    return Response.json({
      ok: true,
      message: 'success',
      code: 200,
      data: await prisma.post.findMany({
        where: {
          authorId: authorId.includes(',') ? { in: authorId.split(',').map(i => +i) } : +authorId,
          deleted: false,
        },
        ...trindets,
      }),
    })
  } else if (mentioned) {
    const mentions = await prisma.postMention.findMany({ where: { userId: +mentioned }, select: { postId: true } })

    return Response.json({
      ok: true,
      message: 'success',
      code: 200,
      data: await prisma.post.findMany({
        where: { id: { in: mentions.map(item => item.postId) }, deleted: false },
        ...trindets,
      }),
    })
  } else {
    return Response.json({
      ok: true,
      message: 'success',
      code: 200,
      data: await prisma.post.findMany({
        where: { authorId: (await users.getId()).userId, deleted: true },
        ...trindets,
      }),
    })
  }

  return Response.json({ ok: false, message: 'Not found', code: 404 })
}
