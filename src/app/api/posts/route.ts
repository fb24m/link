import { prisma } from '@/services/Prisma.service'
import { users } from '@/shared/api/users'
import { NextRequest } from 'next/server'
import { PostFindManyArgs } from '../../../../generated/prisma/models'

type PrismaSelect = { [key: string]: boolean }

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
