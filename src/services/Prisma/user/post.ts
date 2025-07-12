import { prisma } from '@/services/Prisma.service'

export const postUser = async (id: number, newData: unknown) => {
	const user = await prisma.user.update({
		where: { id },
		data: typeof newData === 'object' ? newData! : {}
	})

	return user
}