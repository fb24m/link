import { prisma } from '@/services/Prisma.service'
import { User } from '@prisma/client'

export const postUser = async (id: number, newData: unknown) => {
	const user = await prisma.user.update({
		where: { id },
		data: typeof newData === 'object' ? newData! : {}
	})

	return user
}