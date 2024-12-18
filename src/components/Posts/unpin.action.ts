'use server'

import { API } from '@/shared/api/helpers/env'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const unpin = async () => {
	await fetch(`${API}/user/${(await cookies()).get('link_saved_user')?.value.split(':')[0]}/pin`, {
		method: 'post',
		body: JSON.stringify({ id: undefined }),
		headers: {
			'Authorization': `Bearer ${btoa((await cookies()).get('link_saved_user')?.value ?? '')}`
		}
	})

	revalidatePath('/profile')
}