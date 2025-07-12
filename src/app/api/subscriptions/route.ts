import { prisma } from '@/services/Prisma.service'
import { cookies } from 'next/headers'

export const GET = async () => {
	const cookie = await cookies()

	const lastUpdated = cookie.get('subscriptions.last_updated')?.value

	if (!lastUpdated || !cookie.has('subscriptions')) {
		const auth = cookie.get('link_saved_user')?.value

		if (!auth?.split(':')[0]) return Response.json({
			ok: false,
			code: 401,
			message: 'No authorization data found'
		})

		const user = await prisma.user.findUnique({
			where: { username: auth?.split(':')[0] }
		})

		if (!user) return Response.json({
			ok: false,
			code: 401,
			message: 'Authorization data found but is not correct'
		})

		const subscriptions = await prisma.subscription.findMany({
			where: { from: user?.id }
		})

		const data = await Promise.all(subscriptions.map(s => prisma.user.findUnique({
			where: { id: s.to },
			select: { id: true, username: true }
		})))

		cookie.set('subscriptions', JSON.stringify(data))
		cookie.set('subscriptions.last_updated', new Date().toISOString())

		return Response.json({
			ok: true, data
		})
	}
	else {
		return Response.json({
			source: "cache-cookie",
			lastUpdated,
			ok: true,
			data: JSON.parse(cookie.get('subscriptions')!.value)
		})
	}
}