'use server'

import { users } from '@/shared/api/users'
import { revalidatePath } from 'next/cache'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export const pin = async (formData: FormData) => {
  const id = +formData.get('id')!

  if (!id) {
    return
  }

  const { username, userId } = await users.getId()

  await fetch(`${process.env.API}/pin`, {
    method: 'post',
    body: JSON.stringify({ id }),
    headers: { Cookie: (await cookies()).toString() },
    credentials: 'include',
  })

  revalidateTag(`user`, 'max')
  revalidateTag(`user/${username}`, 'max')
  revalidateTag(`user/${userId}`, 'max')
  revalidatePath(`/user/${username}`, 'layout')
  revalidatePath(`/profile`, 'layout')
}
