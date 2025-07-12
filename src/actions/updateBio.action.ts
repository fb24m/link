'use server'

import { exists } from '@/functions/exists'
import { postUser } from '@/services/Prisma/user/post'
import { users } from '@/shared/api/users'
import { revalidatePath, revalidateTag } from 'next/cache'

export const updateBio = async (formData: FormData): Promise<void> => {
	const rawData = {
		newBio: exists(formData.get('new-bio')) as string
	}

	const user = await users.getMe()

	if (!user.data) return

	await postUser(user.data.id, { bio: rawData.newBio })

	revalidateTag('user')
	revalidatePath('/profile')
}
