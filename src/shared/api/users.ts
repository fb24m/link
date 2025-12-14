import { request } from '@/shared/api/helpers/request'
import { User, UserProfileLink } from '@prisma/client'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

export const users = {
  getMe: (): Promise<User> => request<User>(`user`),
  getLinksByUsername: (username: string): Promise<UserProfileLink[]> =>
    request<UserProfileLink[]>(`user/${username}/links`),

  get: async (selector: string | number): Promise<User> => await request(`user/${selector}`),

  getGemini: async (): Promise<{ response: string }> => request<{ response: string }>('user/gemini', {}, true),
  geminiReady: async (): Promise<boolean> => (await request<{ geminiReady: boolean }>('user/geminiready')).geminiReady,

  getId: async (userCookies?: ReadonlyRequestCookies): Promise<{ userId: number; username: string }> => {
    const cookie = userCookies ?? (await cookies())
    const token = cookie.get('user')?.value

    if (token) {
      try {
        return jwt.verify(token, process.env.JWT_SIGN!) as { userId: number; username: string }
      } catch (err) {
        console.error('Invalid token', err)
      }
    }

    redirect('/login')
  },

  updatePassword: async (newPassword: string) => {
    const cookie = await cookies()

    await request(`user/${cookie.get('link_saved_user')?.value.split(':')[0]}/password`, {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
      headers: { Authorization: `Bearer ${btoa(cookie.get('link_saved_user')?.value ?? '')}` },
    })

    cookie.set('link_saved_user', `${cookie.get('link_saved_user')?.value.split(':')[0]}:${newPassword}`)
  },
  changeUsername: async (username: string) => {
    const cookie = await cookies()

    await request(`user/${cookie.get('link_saved_user')?.value.split(':')[0]}/username`, {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: { Authorization: `Bearer ${btoa(cookie.get('link_saved_user')?.value ?? '')}` },
    })

    cookie.set('link_saved_user', `${username}:${cookie.get('link_saved_user')?.value.split(':')[1]}`)
  },
  toggleSubscription: async (from: number, to: number) =>
    await request(`user/${(await cookies()).get('link_saved_user')?.value.split(':')[0]}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${btoa((await cookies()).get('link_saved_user')?.value ?? '')}` },
      body: JSON.stringify({ from, to }),
    }),
  // checkSubscription: async (to: number) => {},
}
