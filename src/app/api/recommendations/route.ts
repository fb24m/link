import { prisma } from '@/services/Prisma.service'
import { request as notrequest } from '@/shared/api/helpers/request'
import { cookies } from 'next/headers'
import { PostFindManyArgs } from '../../../../generated/prisma/models'

type PrismaSelect = { [key: string]: boolean }

export const GET = async (request: Request) => {
  const queryParams = new URLSearchParams(new URL(request.url).search)

  const subscriptions = await notrequest<{ ok: boolean; data: { id: number; username: string }[] }>(`subscriptions`, {
    headers: { Cookie: (await cookies()).toString() },
  })

  const fields = queryParams
    .get('fields')
    ?.split(',')
    .reduce((acc: PrismaSelect, field) => {
      acc[field] = true
      return acc
    }, {})

  if (!subscriptions.ok) return Response.json({ ok: false, code: 401, message: 'No subscriptions data found' })

  const subscriptionIds = subscriptions.data.map(s => s.id)

  const include = fields
    ? { select: { ...fields, _count: { select: { comments: true } } } }
    : { include: { _count: { select: { comments: true } } } }

  const trindets: Partial<PostFindManyArgs> = {
    ...(include as PostFindManyArgs),
    take: 100,
    orderBy: {
      publishDate: 'asc', // или id: 'desc'
    },
  }

  return Response.json({
    ok: true,
    data: await prisma.post.findMany({ where: { authorId: { in: subscriptionIds }, deleted: false }, ...trindets }),
  })
}
