'use server'

import { exists } from '@/functions/exists'
import { postUser } from '@/services/Prisma/user/post'
import { users } from '@/shared/api/users'
import { revalidatePath, revalidateTag } from 'next/cache'

export const updateBio = async (formData: FormData): Promise<void> => {
  const rawData = { newBio: exists(formData.get('new-bio')) as string }

  const { userId, username } = await users.getId()

  await postUser(userId, { bio: rawData.newBio })

  revalidateTag('user')
  revalidatePath('/profile')
  revalidatePath(`/user/${username}`)
}
