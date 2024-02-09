'use server'

import { parseUser } from '@/functions/parseUser'

export const checkSubscription = async (channedId: number): Promise<boolean | undefined> => {
	const user = await parseUser(false)

	return user?.data?.subscribedTo?.includes(`,${channedId},`)
}
