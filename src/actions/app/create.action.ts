'use server'

import { exists } from '@/functions/exists'
import { parseUser } from '@/functions/parseUser'
import { prisma } from '@/services/Prisma.service'

export const createApp = async (formData: FormData): Promise<void> => {
	const developer = await parseUser()

	const rawData = {
		developerId: developer?.data?.id,
		name: exists(formData.get('name')) as string,
		description: exists(formData.get('description')) as string,
		url: exists(formData.get('url')) as string
	}

	console.log(rawData)

	await prisma.app.create({
		data: {
			userId: rawData.developerId,
			title: rawData.name,
			description: rawData.description,
			url: rawData.url
		}
	})
}
