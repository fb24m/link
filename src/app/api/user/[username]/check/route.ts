import { prisma } from '@/services/Prisma.service'
import type { NextRequest } from 'next/server'

// TODO: move function to new file
const not = <T>(obj: T): boolean => typeof obj !== 'undefined' || obj !== null

// TODO: Fix typization
export const GET = async (
  request: NextRequest,
  props: { params: Promise<{ username: string }> }
): Promise<any> => {
  const params = await props.params
  const searchParams = new URL(request.url).searchParams
  const gettedPassword = searchParams.get('password')

  const user = await prisma.user.findUnique({
    where: { username: params.username },
  })

  if (not(gettedPassword))
    return Response.json({
      ok: false,
      code: 400,
      message: 'password not received',
    })
  if (not(user))
    return Response.json({ ok: false, code: 404, message: 'user not found' })

  return Response.json({
    ok: true,
    code: 200,
    message: 'success',
    match_password: user?.password === gettedPassword,
  })
}
