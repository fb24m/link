'use server'

import { prisma } from '@/services/Prisma.service'
import { exists } from '../functions/exists'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface Login {
  ok: boolean
  message?: string
}

export const login = async (_: Login | null, formData: FormData): Promise<Login | null> => {
  const email = exists(formData.get('email')) as string
  const cookie = await cookies()

  const user = await prisma.user.findUnique({ where: { email } })

  cookie.set('temp_email', email)

  if (!user) {
    await prisma.tempCode.create({ data: { email, code: 99999 + Math.floor(Math.random() * 900000) } })
  }

  redirect('/auth')

  return null
}
