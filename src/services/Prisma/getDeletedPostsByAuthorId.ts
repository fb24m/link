'use server'

import { exists } from '@/functions/exists'
import { prisma } from '../Prisma.service'
import type { IPost } from '@/shared/interfaces/IPost.interface'

export const getDeletedPostsByAuthorId = async (id: number[], maxPosts: number | false = false): Promise<IPost[]> => {
	const posts: IPost[] = await prisma.post.findMany({
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
