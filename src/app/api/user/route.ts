import { users } from '@/shared/api/users'

export const GET = async () => {
  const { userId } = await users.getId()

  return Response.json(await fetch(`${process.env.API}/user/${userId}`).then(r => r.json()))
}
