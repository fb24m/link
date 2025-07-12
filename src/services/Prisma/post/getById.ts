'use server'

import { prisma } from '@/services/Prisma.service'
import { Post } from '@prisma/client'

export const getPostById = async (id: number): Promise<Post | null> => {
	const post = await prisma.post.findUnique({
		where: { id }
	})

	return post
}
