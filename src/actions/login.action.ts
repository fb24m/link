'use server'

import { prisma } from '@/services/Prisma.service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { exists } from '../functions/exists'

interface Login { ok: boolean, message?: string }

export const login = async (_: Login | null, formData: FormData): Promise<Login | null> => {
	const username = exists(formData.get('username')) as string
	const password = exists(formData.get('password')) as string


	const user = await prisma.user.findUnique({
		where: {
			username, password
		}
	})

	if (user === null) {
		return {
			ok: false,
			message: 'Неправильная электронная почта или пароль.'
		}
	}

	(await cookies()).set('link_saved_user', `${username}:${password}`)

	redirect('/profile')
}
