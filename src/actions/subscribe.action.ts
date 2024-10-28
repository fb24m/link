'use server'

import { exists } from '@/functions/exists'
import { checkSubscription } from '@/services/Prisma/checkSubscription'
import { getUser } from '@/services/Prisma/user/get'
import { getCurrentAuth } from '@/services/Prisma/user/getCurrentAuth'
import { postUser } from '@/services/Prisma/user/post'
import { revalidatePath } from 'next/cache'

export const subscribe = async (formData: FormData): Promise<void> => {
	const channelId = exists(formData.get('channel-id')) as string
	const channel = await getUser(+channelId)
	const user = await getCurrentAuth()

	if (!channel.id || !user?.data?.id) return

	if (await checkSubscription(+channelId)) {
		await postUser(channel.id, {
			subscribers: exists(channel?.subscribers) - 1
		})

		await postUser(user.data.id, {
			subscribedTo: user?.data?.subscribedTo?.split(`,${channelId},`).join('')
		})
	} else {
		await postUser(user.data.id, {
			subscribedTo: user?.data?.subscribedTo + `,${channelId},`
		})

		await postUser(channel.id, {
			subscribers: exists(channel?.subscribers) + 1
		})
	}

	revalidatePath('/user')
}
