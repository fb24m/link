import { prisma } from '@/services/Prisma.service'
import { users } from '@/shared/api/users'

export const POST = async (request: Request) => {
  const body = await request.json()

  const { userId } = await users.getId()

  if (!userId) {
    return Response.json({ ok: false, code: 401, message: 'Not authorized' })
  }

  const updatedUser = await prisma.user.update({ where: { id: userId }, data: { pinned: body.id ?? null } })

  return Response.json({ ok: true, code: 200, message: `pinned post ${body.id}`, data: updatedUser })
}
