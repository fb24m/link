'use server'

import { exists } from '@/functions/exists'
import { checkSavedPost } from '@/services/Prisma/post/checkSaved'
import { getCurrentAuth } from '@/services/Prisma/user/getCurrentAuth'
import { postUser } from '@/services/Prisma/user/post'
import { revalidatePath } from 'next/cache'

export const saveArticle = async (formData: FormData): Promise<void> => {
	const id = +exists(formData.get('post-id'))

	console.log('saveArticle')
	const user = await getCurrentAuth()

	if (!user.data) {
		console.error('user does not exist in saveArticle in saveArticle.action.ts')
		return
	}

	if (!user.ok || !user.data) {
		console.error(`${user.code}: ${user.message}`)
		return
	}

	if (await checkSavedPost(user.data, id)) {
		await postUser(user.data.id, {
			savedArticles: user.data.savedArticles?.split(`/${id}/`).join('') || user.data.savedArticles
		})
	} else {
		await postUser(user.data.id, {
			savedArticles: `${user.data.savedArticles ?? ''}/${id}/`
		})
	}

	revalidatePath('/')
}
