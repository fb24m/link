'use server'

import { users } from '@/shared/api/users'
import { prisma } from '../Prisma.service'

export const createPost = async (content: string, authorId: number): Promise<void> => {
	const author = await users.getMe()

	await prisma.post.create({
		data: {
			content: content.split('\r\n').join('<br>'),
			authorId: author?.data?.id,
			writtenBy: author?.data?.id
		}
	})
}
