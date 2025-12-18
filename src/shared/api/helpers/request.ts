import { cookies } from 'next/headers'

export const request = async <T = unknown>(url: string, init?: RequestInit, noCache?: boolean): Promise<T> => {
  const response = await fetch(`${process.env.API}/${url}`, {
    ...init,
    headers: { Cookie: (await cookies()).toString() },
    ...(!noCache && { next: { tags: [url], revalidate: 999999 } }),
  })
  const json: { data: T } = await response.json()
  return json.data
}
