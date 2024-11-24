import type { IUser } from '@/shared/interfaces/IUser.interface'

export const checkSavedPost = async (user: IUser, id: number): Promise<boolean> => {
	if (!user || !user.id) console.error('checkSavedPost: user is not valid')

	return user?.savedArticles?.includes(`/${id}/`) === true
}
