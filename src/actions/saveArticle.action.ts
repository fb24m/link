'use server'

import { exists } from '@/functions/exists'
import { parseUser } from '@/functions/parseUser'
import { checkSavedPost } from '@/services/Prisma/post/checkSaved'
import { updateUser } from '@/services/Prisma/updateUser'
import { revalidatePath } from 'next/cache'

export const saveArticle = async (formData: FormData): Promise<void> => {
	const id = +exists(formData.get('post-id'))

	console.log('saveArticle')
	const user = await parseUser()

	if (!user) {
		console.error('user does not exist in saveArticle in saveArticle.action.ts')
		return
	}

	if (!user.ok || !user.data) {
		console.error(`${user.code}: ${user.message}`)
		return
	}

	if (await checkSavedPost(user.data, id)) {
		await updateUser(exists<string>(user.data?.email), exists<string>(user.data?.password), {
			savedArticles: user.data?.savedArticles?.split(`/${id}/`).join('')
		})
	} else {
		await updateUser(exists<string>(user.data?.email), exists<string>(user.data?.password), {
			savedArticles: `${user.data?.savedArticles}/${id}/`
		})
	}

	revalidatePath('/')
}
