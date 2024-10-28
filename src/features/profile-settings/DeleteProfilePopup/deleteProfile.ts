'use server'

import { prisma } from '@/services/Prisma.service'
import { cookies } from 'next/headers'

export const deleteProfile = async (_: unknown, formData: FormData) => {

	const testPhrase = formData.get('test-phrase')
	const agreeCheckbox = formData.get('agree-deletion')

	console.log(testPhrase, agreeCheckbox)

	if (testPhrase !== 'Я подтверждаю, что хочу удалить свой профиль') {
		return 'Напишите в поле правильную фразу с учетом регистра и знаков препинания'
	}
	if (agreeCheckbox !== 'on') {
		return 'Поставьте галочку в поле'
	}

	const cookie = await cookies()

	await prisma.user.delete({
		where: {
			username: cookie.get('link_saved_user')?.value.split(':')[0]
		}
	})

	cookie.delete('link_saved_user')
}