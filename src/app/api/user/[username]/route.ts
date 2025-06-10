import { gravatar } from '@/services/gravatar.service'
import { prisma } from '@/services/Prisma.service'
import type { NextRequest } from 'next/server'

// TODO: Fix typization
export const GET = async (_: NextRequest, props: { params: Promise<{ username: string }> }): Promise<any> => {
  const params = await props.params
  let user = await prisma.user.findUnique({
    where: {
      ...!/^\d+$/.test(params.username) ? { username: params.username } : { id: +params.username }
    }
  })

  if (!user) return Response.json({ ok: false, code: 404, message: 'not found' })

  if (!user?.last_gravatar_query || (new Date().getTime() - user?.last_gravatar_query.getTime()) > 60000 * 15) {
    const avatar = await gravatar.getAvatar(user?.email ?? '')

    if (avatar) {
      await prisma.user.update({
        where: { username: params.username },
        data: {
          last_gravatar_query: new Date(),
          avatar: avatar.entry?.[0].thumbnailUrl,
          pronouns: avatar.entry?.[0].pronouns
        }
      })

      if (user) {
        user.avatar = avatar.entry?.[0].thumbnailUrl
        user.pronouns = avatar.entry?.[0].pronouns
      }
    }
  }

  const safeUser = {
    ...user,
    password: undefined,
    savedArticles: user?.savedArticles?.split('/').map(item => +item).filter(item => item)
  }

  return Response.json({ ok: true, code: 200, message: 'success', data: safeUser })
}
