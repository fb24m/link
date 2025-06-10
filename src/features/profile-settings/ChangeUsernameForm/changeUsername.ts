'use server'

import { users } from '@/shared/api/users'

export const changeUsername = async (_: unknown, formData: FormData) => {
	const username = formData.get('username')?.toString() ?? ''


	if (username.length < 3) {
		return 'Имя пользователя должно быть не короче 3-ех символов'
	}
	else if (encodeURI(username) !== username) {
		return 'Имя пользователя должно содержать только латиницу и цифры'
	}
	else if (encodeURI(username) !== username) {
		return 'Имя пользователя должно быть не короче 3-ех символов и содержать только латиницу и цифры'
	}
	else if (/^\d+$/.test(username)) {
		return 'Имя пользователя не должно содержать только цифры'
	}

	const sameUsernameUser = await users.get(username)

	if (sameUsernameUser) {
		return 'Имя пользователя недоступно'
	}

	await users.changeUsername(username)
}