import { prisma } from '@/services/Prisma.service'
import { request } from '@/shared/api/helpers/request'
import { cookies } from 'next/headers'

export const GET = async () => {
	const subscriptions = await request<{ ok: boolean, data: { id: number, username: string }[] }>(`subscriptions`, {
		headers: { Cookie: (await cookies()).toString() }
	})

	if (!subscriptions.ok) return Response.json({
		ok: false,
		code: 401,
		message: 'No subscriptions data found'
	})

	const subscriptionIds = subscriptions.data.map(s => s.id)

	return Response.json({
		ok: true,
		data: await prisma.post.findMany({
			where: { authorId: { in: subscriptionIds }, deleted: false }
		})
	})
}