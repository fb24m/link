'use server'

import { cookies } from 'next/headers'

export const login = async (_: string | null, formData: FormData): Promise<string | null> => {
  const cookie = await cookies()
  const password = formData.get('password')

  const response = await fetch(`${process.env.API}/auth/login`, {
    method: 'post',
    body: JSON.stringify({ password }),
    headers: { Cookie: cookie.toString() },
  })

  const headers = await response.headers.getSetCookie()

  console.log(headers)
  // console.log(cookie)

  return 'ok'
}
