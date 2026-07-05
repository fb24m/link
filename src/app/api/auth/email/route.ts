import { prisma } from '@/services/prisma'
import { SignJWT } from 'jose'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const secret = new TextEncoder().encode(process.env.JWT_SIGN)

export const POST = async (request: Request) => {
  const body = await request.json()

  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ status: 'wrongEmail', message: '' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email: body.email } })

  if (!user) {
    if (process.env.JWT_SIGN) {
      const token = await new SignJWT({ email: body.email })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(secret)

      resend.emails.send({
        from: 'noreply@thenextlink.ru',
        to: 'notfakem1ner@gmail.com',
        subject: 'Верификация NextLink',
        html: `<p>вот ссылка короче https://thenextlink.ru/register/?verification=${token}</p>`,
      })
    }

    return NextResponse.json({ status: 'codeSent' })
  } else {
    return NextResponse.json({ status: 'passwordNeeded' })
  }
}
