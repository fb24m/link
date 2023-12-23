'use server'

import { getUser } from './getUser'

export const checkSubscription = async (channedId: number): Promise<boolean | undefined> => {
	const user = await getUser()

	return user?.subscribedTo?.includes(`,${channedId},`)
}
