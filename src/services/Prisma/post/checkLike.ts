import { getPostById } from './getById'

export const checkLike = async (userId: number, postId: number): Promise<boolean> => {
	const post = await getPostById(postId)

	return post?.liked?.includes(`/${userId}/`) === true
}
