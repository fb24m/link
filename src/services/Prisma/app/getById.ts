import type { IApp } from '@/interfaces/App.interface'
import type { IResponse } from '@/interfaces/IResponse.interface'
import { prisma } from '@/services/Prisma.service'

export const getAppById = async (id: number): Promise<IResponse<IApp>> => {
	const app = await prisma.app.findUnique({
		where: { id }
	})

	return {
		data: app as IApp
	}
}
