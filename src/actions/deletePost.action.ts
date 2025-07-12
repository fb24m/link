'use server'

import { exists } from '@/functions/exists'
import { deletePost as deletePostById } from '@/services/Prisma/post/delete'
import { revalidatePath } from 'next/cache'

export const deletePost = async (formData: FormData): Promise<void> => {
	const id = +exists(formData.get('post-id'))

	await deletePostById(id)
	revalidatePath('/profile')
}
