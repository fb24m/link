import { prisma } from '@/services/Prisma.service'

export const POST = async (request: Request, props: { params: Promise<{ username: string }> }) => {
	const body = await request.json()
	const headers = new Headers(request.headers)

	const user = await prisma.user.findUnique({
		where: {
			id: body.from
		}
	})

	console.log(btoa(`${user?.username}:${user?.password}`))

	if (!user || `Bearer ${btoa(`${user?.username}:${user?.password}`)}` !== headers.get('Authorization')) {
		return Response.json({
			ok: false,
			code: 401,
			message: 'Not authorized'
		})
	}

	if (!body.to) {
		return Response.json({
			ok: false,
			code: 400,
			message: 'to is not specified'
		})
	}

	const existingSubscription = await prisma.subscription.findFirst({
		where: {
			from: body.from,
			to: body.to
		}
	})

	if (existingSubscription) {
		await prisma.subscription.delete({ where: existingSubscription })

		return Response.json({
			ok: true,
			code: 200,
			message: 'Подписка удалена'
		})
	}
	else {
		const subscription = await prisma.subscription.create({
			data: {
				from: body.from,
				to: body.to
			}
		})

		return Response.json({
			ok: true,
			code: 200,
			subscription
		})
	}
}