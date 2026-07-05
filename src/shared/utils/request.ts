import { cookies } from 'next/headers'

export const request = async <T = unknown>(url: string, init?: RequestInit, noCache?: boolean): Promise<T> => {
  const cookie = await cookies()
  const cookieHeader = cookie.toString()

  const response = await fetch(`${process.env.API}/${url}`, {
    ...init,
    headers: { Cookie: cookieHeader },
    ...(!noCache && { next: { tags: [url], revalidate: 999999 } }),
  })

  if (!response.ok) {
    throw new Error(response.status + ' ' + response.statusText)
  }

  const json: T = await response.json()
  return json
}
