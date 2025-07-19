import type { IApp } from '@/shared/interfaces/App.interface'
import type { IResponse } from '@/shared/interfaces/IResponse.interface'
import { prisma } from '@/services/Prisma.service'

export const getAppByOwnerId = async (
  ownerId: number
): Promise<IResponse<IApp[]>> => {
  const apps = await prisma.app.findMany({
    where: {
      userId: ownerId,
    },
  })

  return {
    data: apps as IApp[],
  }
}
