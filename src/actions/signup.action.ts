'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { exists } from '../functions/exists'

const getRandomInt = (min: number, max: number): number => {
	const num = Math.floor(Math.random() * max)

	if (num >= min) return num
	else return getRandomInt(min, max)
}

export const signup = async (_: unknown, formData: FormData): Promise<{ ok: boolean, message: string } | null> => {
	const cookie = await cookies()

	const rawData = {
		email: exists(formData.get('email')) as string,
		username: exists(formData.get('username')) as string,
		password: exists(formData.get('password')) as string,
		repeatPassword: exists(formData.get('repeat-password')) as string
	}

	if (rawData.password !== rawData.repeatPassword) {
		return { ok: false, message: 'Пароли не совпадают' }
	}

	const code: string = `${getRandomInt(100000, 999999)}`;

	cookie.set('temp_email', rawData.email)
	cookie.set('temp_password', rawData.password)
	cookie.set('temp_username', rawData.username)
	cookie.set('confirm_code', code)

	fetch(`https://fb24m.ru/mail.php?to=${rawData.email}&subject=Подтверждение почты&message=Ваш код подтверждения: ${code}`)
		.then((data) => data.text())
		.then((text) => { console.log(text) })
		.catch((error) => { console.log(error) })

	redirect('/confirm_email')
}
