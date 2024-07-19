'use server'

import { exists } from '@/functions/exists'
import { parseUser } from '@/functions/parseUser'
import { checkSubscription } from '@/services/Prisma/checkSubscription'
import { getUser } from '@/services/Prisma/getUser'
import { updateUser } from '@/services/Prisma/updateUser'
import { revalidatePath } from 'next/cache'

export const subscribe = async (formData: FormData): Promise<void> => {
	const channelId = exists(formData.get('channel-id')) as string
	const channel = await getUser({ id: +channelId })
	const user = await parseUser()

	if (await checkSubscription(+channelId)) {
		await updateUser(exists(channel?.data?.email), exists<string>(channel?.data?.password), {
			subscribers: exists(channel?.data?.subscribers) - 1
		})

		await updateUser(exists(user?.data?.email), exists<string>(user?.data?.password), {
			subscribedTo: user?.data?.subscribedTo?.split(`,${channelId},`).join('')
		})
	} else {
		await updateUser(exists(user?.data?.email), exists<string>(user?.data?.password), {
			subscribedTo: user?.data?.subscribedTo + `,${channelId},`
		})

		await updateUser(exists(channel?.data?.email), exists<string>(channel?.data?.password), {
			subscribers: exists(channel?.data?.subscribers) + 1
		})
	}

	revalidatePath('/user')
}
