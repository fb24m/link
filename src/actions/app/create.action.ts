'use server'

import { exists } from '@/functions/exists'
import { prisma } from '@/services/Prisma.service'
import { users } from '@/shared/api/users'

export const createApp = async (formData: FormData): Promise<void> => {
  const { userId } = await users.getId()

  const rawData = {
    developerId: userId,
    name: exists(formData.get('name')) as string,
    description: exists(formData.get('description')) as string,
    url: exists(formData.get('url')) as string,
  }

  await prisma.app.create({
    data: { userId: rawData.developerId, title: rawData.name, description: rawData.description, url: rawData.url },
  })
}
