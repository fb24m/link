import { prisma } from '@/services/Prisma.service'
import { posts } from '@/shared/api/posts'
import { users } from '@/shared/api/users'
import { GoogleGenAI } from '@google/genai'

export const POST = async (request: Request) => {
  const data = await request.json()
  const { userId } = await users.getId()

  if (!data.key) {
    return Response.json({ ok: false, status: 400 })
  } else {
    await prisma.user.update({ where: { id: userId }, data: { geminiKey: data.key } })
  }

  return Response.json(await fetch(`${process.env.API}/user/${userId}`).then(r => r.json()))
}

export const GET = async (request: Request) => {
  const { userId } = await users.getId()
  const myposts = await posts.getByAuthorId(userId, { max: 20, fields: 'content' })

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { geminiKey: true } })

  if (!user?.geminiKey)
    return Response.json({ ok: true, data: { response: 'Не удалось получить API-ключ или он неверный' } })

  const ai = new GoogleGenAI({ apiKey: user?.geminiKey })

  const text = ai.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    contents: [
      `Вот предыдущие посты пользователя в виду JSON: ${JSON.stringify(myposts)}. Сгенерируй новый пост для пользователя, чтобы по стилю выглядело так, будто этот пост составлял сам пользователь. Объем, стиль, пунктуация и особенности - все должно быть скопировано. Ответом должен быть чистый отформатированный текст без JSON-разметки или дополнительных комментариев`,
    ],
  })

  return Response.json({ ok: true, data: { response: (await text).text } })
}
