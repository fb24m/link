'use server'

import { users } from '@/shared/api/users'
import { cookies } from 'next/headers'

export const changePassword = async (_: unknown, formData: FormData) => {
	const currentPassword = formData.get('current-password')
	const newPassword = formData.get('new-password')?.toString() ?? ''
	const repeatPassword = formData.get('new-password')?.toString() ?? ''

	if ((await cookies()).get('link_saved_user')?.value.split(':')[1] !== currentPassword) {
		return 'Неправильный текущий пароль'
	}
	if (newPassword !== repeatPassword) {
		return 'Пароли не совпадают'
	}

	console.log('updating password')

	await users.updatePassword(newPassword)
}