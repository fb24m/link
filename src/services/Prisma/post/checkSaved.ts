import { User } from '@prisma/client'

export const checkSavedPost = async (user: User, id: number): Promise<boolean> => {
	if (!user || !user.id) console.error('checkSavedPost: user is not valid')

	return user?.savedArticles?.includes(`/${id}/`) === true
}
