'use server'

import { exists } from '@/functions/exists'
import { getCurrentAuth } from '@/services/Prisma/user/getCurrentAuth'
import { prisma } from '@/services/Prisma.service'
import { revalidatePath } from 'next/cache'

export const addComment = async (formData: FormData): Promise<void> => {
	const rawData = {
		text: exists<string>(formData.get('text') as string),
		post: exists(formData.get('post-id'))
	}

	const user = await getCurrentAuth()
	getCurrentAuth
	await prisma.comment.create({
		data: {
			postId: +rawData.post,
			authorId: exists(user?.data?.id),
			content: rawData.text
		}
	})

	revalidatePath(`/article/${+rawData.post}`)
}
