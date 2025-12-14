'use server'

import { prisma } from '@/services/Prisma.service'
import { v2 as cloudinary } from 'cloudinary'
import { users } from './users'
import { revalidatePath } from 'next/cache'
import { revalidateTag } from 'next/cache'

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const setAvatar = async (_: unknown, formData: FormData): Promise<string> => {
  const avatar = formData.get('avatar') as File

  if (!avatar) {
    throw new Error('Нет файла')
  }

  const arrayBuffer = await avatar.arrayBuffer()

  const base64 = Buffer.from(arrayBuffer).toString('base64')

  const dataUrl = `data:${avatar.type};base64,${base64}`

  const file = await cloudinary.uploader.upload(dataUrl, {})

  const me = await users.getMe()

  await prisma.user.update({ where: { id: me.id }, data: { avatar: file.secure_url ?? '' } })

  revalidatePath('/profile', 'layout')
  revalidatePath(`/user/${me.username}`, 'layout')
  revalidateTag(`user/${me.id}`, 'max')
  revalidateTag(`user/${me.username}`, 'max')

  return 'finished'
}
