import { prisma } from '@/services/Prisma.service'

export const POST = async (request: Request, props: { params: Promise<{ username: string }> }) => {
	const body = await request.json()
	const headers = new Headers(request.headers)

	const user = await prisma.user.findUnique({
		where: {
			username: (await props.params).username
		}
	})

	if (!user || `Bearer ${btoa(`${user?.username}:${user?.password}`)}` !== headers.get('Authorization')) {
		return Response.json({
			ok: false,
			code: 401,
			message: 'Not authorized'
		})
	}

	const updatedUser = await prisma.user.update({
		where: user,
		data: {
			pinned: body.id ?? null
		}
	})

	return Response.json({
		ok: true,
		code: 200,
		message: `pinned post ${body.id}`,
		data: updatedUser
	})
}