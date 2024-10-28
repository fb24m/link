/**
 * Функция confirmEmail проверяет, соответствует ли предоставленный код подтверждения коду, хранящемуся
 * в файлах cookie, и если да, то создает нового пользователя с временным адресом электронной почты,
 * паролем и именем пользователя, хранящимися в файлах cookie, и перенаправляет на страницу входа.
 * @param {FormData} formData - Параметр formData имеет тип FormData, который представляет собой
 * встроенный объект JavaScript, представляющий набор пар ключ/значение. Он обычно используется для
 * отправки данных в HTTP-запросах, особенно при отправке форм.
 */
'use server'

import { exists } from '@/functions/exists'
import { prisma } from '@/services/Prisma.service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const confirmEmail = async (formData: FormData): Promise<void> => {
	const rawData = {
		code: exists(formData.get('code')) as string
	}

	if ((await cookies()).get('confirm_code')?.value === rawData.code.trim()) {
		await prisma.user.create({
			data: {
				email: exists((await cookies()).get('temp_email')).value,
				password: exists((await cookies()).get('temp_password')).value,
				username: exists((await cookies()).get('temp_username')).value
			}
		})

		redirect('/login')
	}
}
