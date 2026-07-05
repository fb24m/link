import { prisma } from '@/services/prisma'
import { route, routeWithoutBody } from '@/shared/utils/route'
import { revalidateTag } from 'next/cache'
import z from 'zod'

const withAtLeastOne = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => {
  const allowedKeys = Object.keys(schema.shape).join(', ')

  return schema.refine(data => Object.keys(data).length > 0, {
    message: `At least one field is required. Available fields: [${allowedKeys}]`,
  })
}

export const GET = routeWithoutBody(async (_, userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId }, omit: { password: true, geminiKey: true } })

  return Response.json(user)
})

const UserSchema = withAtLeastOne(
  z.object({
    bio: z.string().max(120).optional(),
    pinned: z.number().optional(),
    pronouns: z.string().max(12).optional(),
  })
)

export const PATCH = route(UserSchema, async (_, body, userId) => {
  const user = await prisma.user.update({ where: { id: userId }, data: { ...body } })
  revalidateTag('users/me', 'max')
  revalidateTag(`users/${userId}`, 'max')

  return Response.json(user)
})
