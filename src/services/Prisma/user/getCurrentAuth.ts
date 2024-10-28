import { IResponse } from '@/interfaces/IResponse.interface'
import { User } from '@prisma/client'
import { cookies } from 'next/headers'

export const getCurrentAuth = async (): Promise<IResponse<User>> => {
	console.log('getting auth')

	const cookie = await cookies()

	if (!cookie.get('link_saved_user')?.value) return { ok: false, message: 'Cookie link_saved_user not found' }

	const [username] = cookie.get('link_saved_user')!.value.split(':')

	const response = await fetch(`http://localhost:3000/api/user/${username}`)
	const user = await response.json()

	return {
		ok: !!user,
		...(user && { data: user.user })
	}
}