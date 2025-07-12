'use server'

import { exists } from '@/functions/exists'
import { prisma } from '@/services/Prisma.service'
import { createPost as prisma_createPost } from '@/services/Prisma/createPost'
import { redirect } from 'next/navigation'

export const createPost = async (formData: FormData): Promise<void> => {
	const rawData = {
		content: exists(formData.get('content')) as string,
		writtenBy: exists(formData.get('written-by')) as string,
		author: formData.get('author') as string
	}

	const authorId = typeof rawData.author === 'string'
		? await prisma.community.findUnique({ where: { id: 0 } })
		: await prisma.user.findUnique({ where: { username: rawData.writtenBy } })

	await prisma_createPost(rawData.content.split('<').join('&lt;').split('>').join('&gt;'), exists<number>(authorId?.id))
	redirect('/profile')
}
