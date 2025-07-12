'use server'

import { exists } from '@/functions/exists'
import { prisma } from '../Prisma.service'
import { Post } from '@prisma/client'

export const getDeletedPostsByAuthorId = async (id: number[], maxPosts: number | false = false): Promise<Post[]> => {
	const posts = await prisma.post.findMany({
		where: {
			authorId: {
				in: id
			},
			deleted: true
		},
		take: exists(maxPosts) === 0 ? +exists(maxPosts) : 100
	})

	return posts
}
