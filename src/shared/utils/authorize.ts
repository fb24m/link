import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import z from 'zod'

const secret = new TextEncoder().encode(process.env.JWT_SIGN)

export const authorize = async (): Promise<number | Response> => {
  if (!process.env.JWT_SIGN) return Response.json({ message: 'noJWT' }, { status: 500 })

  const cookie = await cookies()
  const authorization = cookie.get('Authorization')

  if (!authorization) return Response.json({}, { status: 403 })

  const { payload } = await jwtVerify(authorization.value, secret)
  const id = z.number().safeParse(payload.id)

  if (id.success) {
    return id.data
  }

  return Response.json({}, { status: 500 })
}
