'use server'

import type { IPost } from '@/shared/interfaces/IPost.interface'
import { prisma } from '@/services/Prisma.service'

export const getPostById = async (id: number): Promise<IPost | null> => {
	const post = await prisma.post.findUnique({
		where: { id }
	})

	return post
}
