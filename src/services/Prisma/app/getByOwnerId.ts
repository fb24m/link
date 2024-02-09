import type { IApp } from '@/interfaces/App.interface'
import type { IResponse } from '@/interfaces/IResponse.interface'
import { prisma } from '@/services/Prisma.service'

export const getAppByOwnerId = async (ownerId: number): Promise<IResponse<IApp[]>> => {
	const apps = await prisma.app.findMany({
		where: {
			userId: ownerId
		}
	})

	return {
		data: apps as IApp[]
	}
}
