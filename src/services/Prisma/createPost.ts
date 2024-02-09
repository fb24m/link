'use server'

import { exists } from '@/functions/exists'
import { prisma } from '../Prisma.service'
import { parseUser } from '@/functions/parseUser'

export const createPost = async (content: string): Promise<void> => {
	const author = await parseUser(false, 'createPost')

	await prisma.post.create({
		data: {
			content: content.split('\r\n').join('<br>'),
			authorId: exists<number>(author?.data?.id)
		}
	})
}
