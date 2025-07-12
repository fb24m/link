'use server'

import { prisma } from '@/services/Prisma.service'

export const deletePost = async (id: number): Promise<void> => {
	await prisma.post.delete({
		where: { id }
	})
}
