'use server'

import { exists } from '@/functions/exists'
import { prisma } from '@/services/Prisma.service'
import { createPost as prisma_createPost } from '@/services/Prisma/createPost'
import { redirect } from 'next/navigation'

export const createPost = async (formData: FormData): Promise<void> => {
	const rawData = {
		content: exists(formData.get('content')) as string,
		writtenBy: exists(formData.get('written-by')) as string,
		author: formData.get('author')
	}

	const authorId = typeof rawData.author === 'string'
		? await prisma.community.findUnique({ where: { name: rawData.author } })
		: await prisma.user.findUnique({ where: { username: rawData.writtenBy } })

	if (rawData.content.includes('<script>') || rawData.content.includes('<style>')) return

	await prisma_createPost(rawData.content, exists<number>(authorId?.id))
	redirect('/profile')
}
