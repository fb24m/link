'use server'

import { prisma } from '@/services/Prisma.service'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import jwt from 'jsonwebtoken'

export const auth = async (_: unknown, formData: FormData): Promise<string | null> => {
  const cookie = await cookies()
  const password = formData.get('password')?.toString()

  const user = await prisma.user.findUnique({ where: { email: cookie.get('temp_email')?.value, password } })

  if (!user) {
    return 'Неверный пароль'
  } else {
    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SIGN!, { expiresIn: '7d' })
    cookie.set('user', token, { httpOnly: true, sameSite: 'strict', path: '/' })
    redirect('/profile')
  }
}
