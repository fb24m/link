import { prisma } from '@/services/prisma'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import z from 'zod'

const secret = new TextEncoder().encode(process.env.JWT_SIGN)

export const GET = async (request: Request) => {
  console.log('GET')

  if (!process.env.JWT_SIGN) return Response.json({ message: 'noJWT' }, { status: 500 })

  const { searchParams } = new URL(request.url)

  const showDeleted = searchParams.get('deleted') === 'true'

  const cookie = await cookies()
  const authorization = cookie.get('Authorization')

  if (!authorization) return Response.json({}, { status: 403 })

  const { payload } = await jwtVerify(authorization.value, secret)
  const id = z.number().safeParse(payload.id)

  if (id.success) {
    const posts = await prisma.post.findMany({ where: { authorId: id.data, deleted: showDeleted } })

    return Response.json([...posts])
  }

  return Response.json({})
}
