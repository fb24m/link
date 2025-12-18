import { request } from '@/shared/api/helpers/request'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { UserProfileLink } from '../../../generated/prisma/client'
import { User } from '../../../generated/prisma/browser'
import { revalidateTag } from 'next/cache'
import { revalidatePath } from 'next/cache'

export const users = {
  getMe: (): Promise<User> => request<User>(`user`),
  getLinksByUsername: (username: string): Promise<UserProfileLink[]> =>
    request<UserProfileLink[]>(`user/${username}/links`),

  get: async (selector: string | number): Promise<User> => await request(`user/${selector}`),

  update: async (update: Partial<User>): Promise<void> => {
    await request('user', { method: 'POST', body: JSON.stringify(update) })
    const { username } = await users.getId()

    revalidateTag('user', 'max')
    revalidatePath('/profile')
    revalidatePath(`/user/${username}`)
  },

  getGemini: async (prompt?: string, source?: string): Promise<{ response: string }> =>
    request<{ response: string }>(
      `user/gemini${prompt ? `?prompt=${prompt}` : ''}${source ? `&source=${source}` : ''}`,
      {},
      true
    ),

  geminiReady: async (): Promise<boolean> =>
    (await request<{ geminiReady: boolean }>('user/geminiready', {}, true)).geminiReady,

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

    return { userId: 0, username: '' }
  },

  updatePassword: async (newPassword: string) => {
    await users.update({ password: newPassword })
  },
  toggleSubscription: async (from: number, to: number) =>
    await request(`user/${(await cookies()).get('link_saved_user')?.value.split(':')[0]}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${btoa((await cookies()).get('link_saved_user')?.value ?? '')}` },
      body: JSON.stringify({ from, to }),
    }),
  // checkSubscription: async (to: number) => {},
}
