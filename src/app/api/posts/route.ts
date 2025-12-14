import { prisma } from '@/services/Prisma.service'
import { users } from '@/shared/api/users'
import { NextRequest } from 'next/server'

type PrismaSelect = { [key: string]: boolean }

export const GET = async (request: NextRequest) => {
  const queryParams = new URLSearchParams(new URL(request.url).search)

  const authorId = queryParams.get('authorId')!
  const fields = queryParams
    .get('fields')
    ?.split(',')
    .reduce((acc: PrismaSelect, field) => {
      acc[field] = true
      return acc
    }, {})
  const max = queryParams.get('max')

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
        select: fields,
        take: max ? Number.parseInt(max) : 100,
        orderBy: {
          publishDate: 'asc', // или id: 'desc'
        },
      }),
    })
  } else {
    return Response.json({
      ok: true,
      message: 'success',
      code: 200,
      data: await prisma.post.findMany({ where: { authorId: (await users.getId()).userId, deleted: true } }),
    })
  }

  return Response.json({ ok: false, message: 'Not found', code: 404 })
}
