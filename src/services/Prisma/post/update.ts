'use server'

import { prisma } from '@/services/Prisma.service'

export const updatePost = async (id: number, newContent: string): Promise<void> => {
	await prisma.post.update({
		where: { id },
		data: { content: newContent }
	})
}
