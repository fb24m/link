/**
 * Эта функция TypeScript извлекает сообщения из базы данных на основе списка идентификаторов авторов.
 * @param {Request} request - Параметр request — это объект, который представляет входящий
 * HTTP-запрос. Он содержит такую информацию, как метод запроса, заголовки и тело.
 * @param  - Приведенный выше код является примером обработчика запроса GET в маршруте API Next.js. Он
 * использует Prisma для запроса базы данных и получения сообщений на основе предоставленных
 * идентификаторов авторов.
 * @returns Код возвращает ответ JSON со следующими свойствами:
 * - ok: логическое значение, указывающее, был ли запрос успешным.
 * - сообщение: строковое сообщение, указывающее статус запроса.
 * - код: целочисленное значение, представляющее код состояния ответа.
 * - сообщения: массив объектов сообщений, полученных из базы данных Prisma.
 */

import { prisma } from '@/services/prisma'
import { route } from '@/shared/utils/route'
import { revalidateTag } from 'next/cache'
import z from 'zod'

export const GET = async (_: Request, props: { params: Promise<{ id: string }> }): Promise<Response> => {
  const params = await props.params

  const posts = await prisma.post.findMany({ where: { id: +params.id } })

  return Response.json(posts)
}

const withAtLeastOne = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => {
  const allowedKeys = Object.keys(schema.shape).join(', ')

  return schema.refine(data => Object.keys(data).length > 0, {
    message: `At least one field is required. Available fields: [${allowedKeys}]`,
  })
}

const patchScheme = withAtLeastOne(
  z.object({ deleted: z.boolean().optional(), content: z.string().min(5).max(5000).optional() }).strict()
)

export const PATCH = route(patchScheme, async (_, data, userId, { params }: { params: Promise<{ id: string }> }) => {
  const id = +(await params).id

  const post = await prisma.post.findUnique({ where: { id }, select: { authorId: true } })

  if (!post || post.authorId !== userId) return Response.json({}, { status: 404 })

  const modified = await prisma.post.update({ where: { id }, data })

  revalidateTag('posts/me', 'max')
  revalidateTag('posts/me?deleted=true', 'max')

  return Response.json(modified)
})
