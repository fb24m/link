import { cookies } from 'next/headers'

export const GET = async () => {
	const username = (await cookies()).get('link_saved_user')?.value.split(':')[0]

	return Response.json(await fetch(`${process.env.API}/user/${username}`).then(r => r.json()))
}
