'use server'

import { prisma } from '../Prisma.service'
import { getCurrentAuth } from './user/getCurrentAuth'

export const createPost = async (content: string, authorId: number): Promise<void> => {
	const author = await getCurrentAuth()

	await prisma.post.create({
		data: {
			content: content.split('\r\n').join('<br>'),
			authorId: author?.data?.id,
			writtenBy: author?.data?.id
		}
	})
}
