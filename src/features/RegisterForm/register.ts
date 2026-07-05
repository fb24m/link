'use server'
import { prisma } from '@/services/prisma'
import { registerSchema } from '@/shared/shemas/Register'
import { jwtVerify } from 'jose'
const secret = new TextEncoder().encode(process.env.JWT_SIGN)

export const register = async (token: string, _: string | null, formData: FormData): Promise<string | null> => {
  try {
    const { payload } = await jwtVerify(token, secret)
    if (!payload.email) return 'noEmail'

    const parsed = registerSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!parsed.success) return 'validationFailed'

    try {
      const user = await prisma.user.create({
        data: {
          email: payload.email.toString(),
          username: formData.get('login')! as string,
          password: formData.get('password')! as string,
        },
      })
      console.log(user)
    } catch (e) {
      console.log(e)
      return 'usernameTaken'
    }
  } catch {
    return 'wrongTok'
  }

  return 'ok'
}
