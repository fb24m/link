'use server'

import { getCurrentAuth } from './user/getCurrentAuth'

export const checkSubscription = async (channedId: number): Promise<boolean | undefined> => {
	const user = await getCurrentAuth()

	return user?.data?.subscribedTo?.includes(`,${channedId},`)
}
