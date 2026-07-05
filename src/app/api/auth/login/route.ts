import { prisma } from '@/services/prisma'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import z from 'zod'

const loginScheme = z.object({ email: z.email(), password: z.string() })
const secret = new TextEncoder().encode(process.env.JWT_SIGN)

export const POST = async (request: Request) => {
  if (!process.env.JWT_SIGN) return Response.json({ message: 'noJwtSign' }, { status: 500 })

  const cookie = await cookies()
  const json = await request.json()

  const parsed = loginScheme.safeParse({ email: cookie.get('auth-email')?.value, password: json.password })
  if (!parsed.success) return Response.json({ message: 'badFormat' }, { status: 400 })

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email, password: parsed.data.password } })
  if (!user) return Response.json({ message: 'badCredentials' }, { status: 403 })

  const token = await new SignJWT({ id: user?.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)

  cookie.set('Authorization', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return Response.json({ message: 'ok' })
}
