import type { IUser } from '@/interfaces/IUser.interface'
import { cookies } from 'next/headers'
import { exists } from './exists'
import { getSelf } from '@/services/Prisma/getSelf'
import type { IResponse } from '@/interfaces/IResponse.interface'

export const parseUser = async (redirectAfter = false /* , next: string = '/' */, log?: string): Promise<IResponse<IUser> | undefined> => {
	log && console.log(log)
	console.log('parsing user in async parseUser')

	const str = cookies().get('session_user')?.value

	if (!str) {
		console.log('Возможно, пользователь авторизован, но в Cookies его аккаунт не сохранен')
		const user = await getSelf(redirectAfter /* , next */)
		return user
	}
	return JSON.parse(exists(str))
}
