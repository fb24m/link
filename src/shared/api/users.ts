import { request } from '@/shared/api/helpers/request'
import { API } from './helpers/env'
import { cookies } from 'next/headers'

export const users = {
	getById: async (id: number) => request(`${API}/user?id=${id}`),
	getByUsername: async (username: string) => (await request(`${API}/user?username=${username}`)).data,
	getLinksByUsername: async (username: string) => (await request(`${API}/user/${username}/links`)).data,
	updatePassword: async (newPassword: string) => {
		console.log('updating password')

		const cookie = await cookies()

		await request(`${API}/user/${cookie.get('link_saved_user')?.value.split(':')[0]}/password`, {
			method: 'POST',
			body: JSON.stringify({ newPassword }),
			headers: {
				'Authorization': `Bearer ${btoa(cookie.get('link_saved_user')?.value ?? '')}`
			}
		})

		cookie.set('link_saved_user', `${cookie.get('link_saved_user')?.value.split(':')[0]}:${newPassword}`)
	}
}