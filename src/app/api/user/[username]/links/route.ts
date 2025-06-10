import { prisma } from '@/services/Prisma.service'

export const GET = async (_: Request, props: { params: Promise<{ username: string }> }) => {
	const { username } = await props.params

	const links = await prisma.userProfileLink.findMany({
		where: {
			User: {
				username
			}
		}
	})

	return Response.json({
		ok: true,
		code: 200,
		message: 'userId is not specified',
		data: links
	})
}

export const POST = async (request: Request, props: { params: Promise<{ username: string }> }) => {
	const headers = new Headers(request.headers)
	const { username } = await props.params
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

	if (!body.link || !body.icon) {
		return Response.json({
			ok: false,
			code: 400,
			message: 'Link or icon is not specified'
		})
	}

	if (await prisma.userProfileLink.findFirst({ where: { User: { username }, link: body.link } })) {
		return Response.json({
			ok: false,
			code: 400,
			message: 'Links must be unique'
		})
	}

	await prisma.userProfileLink.create({
		data: {
			link: body.link,
			icon: body.icon,
			User: {
				connect: {
					username
				}
			}
		}
	})

	return Response.json({
		ok: true,
		code: 200,
		message: 'userId is not specified'
	})
}

export const DELETE = async (request: Request, props: { params: Promise<{ username: string }> }) => {
	const headers = new Headers(request.headers)
	const { username } = await props.params
	const body = await request.json()

	const user = await prisma.user.findUnique({
		where: { username }
	})

	if (!body.id) {
		return Response.json({
			ok: false,
			code: 400,
			message: 'id is not specified'
		})
	}

	if (`Bearer ${btoa(`${user?.username}:${user?.password}`)}` !== headers.get('Authorization')
		|| (await prisma.userProfileLink.findUnique({ where: { id: body.id } }))) {
		return Response.json({
			ok: false,
			code: 401,
			message: 'Not authorized'
		})
	}



	if (await prisma.userProfileLink.findFirst({ where: { User: { username }, link: body.link } })) {
		return Response.json({
			ok: false,
			code: 400,
			message: 'Links must be unique'
		})
	}

	await prisma.userProfileLink.create({
		data: {
			link: body.link,
			icon: body.icon,
			User: {
				connect: {
					username
				}
			}
		}
	})

	return Response.json({
		ok: true,
		code: 200,
		message: 'userId is not specified'
	})
}