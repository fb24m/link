import { prisma } from '@/services/Prisma.service'

export const POST = async (request: Request, props: { params: Promise<{ username: string }> }) => {
	const headers = new Headers(request.headers)
	const { username } = await props.params

	try {
		const body = await request.json()

		const user = await prisma.user.findUnique({
			where: { username }
		})

		if (`Bearer ${btoa(`${user?.username}:${user?.password}`)}` !== headers.get('Authorization')) {
			return Response.json({
				ok: false,
				code: 401,
				message: 'Not authorized'
			})
		}

		if (!body.username) {
			return Response.json({
				ok: false,
				code: 400,
				message: 'Новое имя пользователя не указано'
			})
		}

		await prisma.user.update({
			where: { username },
			data: {
				username: body.username
			}
		})

		return Response.json({
			ok: true,
			code: 200,
			message: 'Имя пользователя успешно изменено'
		})
	}
	catch (e) {
		return Response.json(e)
	}
}