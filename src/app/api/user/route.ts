import { prisma } from '@/services/Prisma.service'
import { users } from '@/shared/api/users'

export const GET = async () => {
  const { userId } = await users.getId()

  return Response.json(await fetch(`${process.env.API}/user/${userId}`).then(r => r.json()))
}

export const POST = async (request: Request) => {
  const body = await request.json()
  const { userId } = await users.getId()

  return Response.json({ ok: true, user: await prisma.user.update({ where: { id: userId }, data: body }) })
}
