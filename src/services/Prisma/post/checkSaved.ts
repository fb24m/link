import { getSelf } from '../getSelf'

export const checkSavedPost = async (id: number): Promise<boolean> => {
	const user = await getSelf()

	if (!user?.ok || !user?.data) console.error(`${user?.code}: ${user?.message}`)

	return user?.data?.savedArticles?.includes(`/${id}/`) === true
}
