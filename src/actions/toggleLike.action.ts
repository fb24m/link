'use server'

import { getPostById } from '@/services/Prisma/post/getById'
import { exists } from '../functions/exists'
import { prisma } from '@/services/Prisma.service'
import { revalidatePath } from 'next/cache'
import { users } from '@/shared/api/users'

export const toggleLike = async (formData: FormData): Promise<void> => {
	const rawData = {
		postId: +exists(formData.get('post-id'))
	}

	const post = await getPostById(rawData.postId)
	const user = await users.getMe()

	// если в списке людей, которые лайкнули пост, нашелся активный пользователь
	if (post?.liked?.includes(`/${user?.id}/`) === true) {
		// обновляем пост
		await prisma.post.update({
			where: { id: post.id },
			data: {
				// убираем активного пользователя из списка людей, которые лайкнули пост
				liked: post?.liked?.replace(`/${user?.id}/`, ''),
				// вычитаем один лайк
				likes: exists(post.likes) - 1
			}
		})
	} else {
		await prisma.post.update({
			where: { id: post?.id },
			data: {
				// добавляем активного пользователя в список людей, которые лайкнули пост
				liked: `${post?.liked}/${user?.id}/`,
				// добавляем лайн
				likes: +exists(post?.liked) + 1
			}
		})
	}

	revalidatePath('/profile')
	revalidatePath('/user/[username]', 'page')
	revalidatePath('/')
}
