'use server'

import { prisma } from '@/services/Prisma.service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { exists } from '../functions/exists'

export const login = async (formData: FormData): Promise<false | null> => {
	const rawData = {
		email: exists(formData.get('email')) as string,
		password: exists(formData.get('password')) as string
	}

	const user = await prisma.user.findUnique({
		where: {
			email: rawData.email,
			password: rawData.password
		}
	})

	if (user === null) {
		return false
	}

	cookies().set('link_saved_user', `${rawData.email}:${rawData.password}`)

	if (cookies().has('login_next_page')) {
		redirect(exists(cookies().get('login_next_page')).value)
	}
	redirect('/profile')
}
