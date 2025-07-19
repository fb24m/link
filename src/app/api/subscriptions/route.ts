import { prisma } from '@/services/Prisma.service'
import { users } from '@/shared/api/users'
import { cookies } from 'next/headers'

export const GET = async () => {
  const cookie = await cookies()
  const userId = await users.getId()

  const lastUpdated = cookie.get('subscriptions.last_updated')?.value

  if (!lastUpdated || !cookie.has('subscriptions')) {
    if (!userId) return Response.json({ ok: false, code: 401, message: 'Authorization data found but is not correct' })

    const subscriptions = await prisma.subscription.findMany({ where: { from: userId } })

    const data = await Promise.all(
      subscriptions.map(s => prisma.user.findUnique({ where: { id: s.to }, select: { id: true, username: true } }))
    )

    cookie.set('subscriptions', JSON.stringify(data))
    cookie.set('subscriptions.last_updated', new Date().toISOString())

    return Response.json({ ok: true, data })
  } else {
    return Response.json({
      source: 'cache-cookie',
      lastUpdated,
      ok: true,
      data: JSON.parse(cookie.get('subscriptions')!.value),
    })
  }
}
