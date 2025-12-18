import { prisma } from '@/services/Prisma.service'
import { users } from '@/shared/api/users'
import { GoogleGenAI } from '@google/genai'

export const GET = async () => {
  const { userId } = await users.getId()

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { geminiKey: true } })

  const ai = new GoogleGenAI({ apiKey: user?.geminiKey ?? 'api-key' })

  try {
    await ai.models.list()
    return Response.json({ ok: true, data: { geminiReady: true } })
  } catch (e) {
    return Response.json({ ok: true, data: { geminiReady: false, problem: e } })
  }
}
