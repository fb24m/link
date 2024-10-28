'use server'

import { exists } from '@/functions/exists'
import { getCurrentAuth } from '@/services/Prisma/user/getCurrentAuth'
import { postUser } from '@/services/Prisma/user/post'
import { revalidatePath } from 'next/cache'

export const updateBio = async (formData: FormData): Promise<void> => {
	const rawData = {
		newBio: exists(formData.get('new-bio')) as string
	}

	const user = await getCurrentAuth()

	if (!user.data) return

	await postUser(user.data.id, { bio: rawData.newBio })

	revalidatePath('/profile')
}
