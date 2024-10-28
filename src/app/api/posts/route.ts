import { prisma } from '@/services/Prisma.service'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
	const queryParams = new URLSearchParams(new URL(request.url).search)

	const authorId = +queryParams.get('authorId')!

	if (!authorId) return Response.json({
		ok: false,
		message: 'Not found',
		code: 404
	})

	const posts = await prisma.post.findMany({
		where: {
			authorId
		}
	})

	return Response.json({
		ok: true,
		message: 'success',
		code: 200,
		data: posts
	})
}