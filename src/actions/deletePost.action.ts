'use server'

import { exists } from '@/functions/exists'
import { deletePost as deletePostById } from '@/services/Prisma/post/delete'
import { users } from '@/shared/api/users'
import { revalidateTag } from 'next/cache'
import { revalidatePath } from 'next/cache'

export const deletePost = async (formData: FormData): Promise<void> => {
  const id = +exists(formData.get('post-id'))
  const { userId, username } = await users.getId()

  await deletePostById(id)
  revalidateTag(`posts`)
  revalidateTag(`posts?authorId=${userId}`)
  revalidatePath('/profile', 'layout')
  revalidatePath(`/user/${username}`, 'layout')
}
