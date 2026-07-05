'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

const emailSchema = z.string().email('Введите корректный email')

export const login = async (prev: string | null, formData: FormData) => {
  const email = formData.get('email')
  const cookie = await cookies()

  const parsed = emailSchema.safeParse(email)
  if (parsed.success) {
    const response = await fetch(`${process.env.API}/auth/email`, { method: 'post', body: JSON.stringify({ email }) })
    const json = await response.json()

    if (json.status === 'passwordNeeded') {
      cookie.set('auth-email', parsed.data)
      redirect('/auth/login')
    }
  } else {
    return JSON.parse(parsed.error.message)[0].message
  }

  return ''
}
