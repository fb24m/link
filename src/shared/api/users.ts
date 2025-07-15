import { request } from '@/shared/api/helpers/request'
import { User } from '@prisma/client'
import { cookies } from 'next/headers'

export const users = {
	getMe: async (): Promise<User> => (await request(`user`)).data,
	getLinksByUsername: async (username: string) => (await request(`user/${username}/links`)).data,
	get: async (selector: string | number): Promise<User> => (await request(`user/${selector}`)).data,

	updatePassword: async (newPassword: string) => {
		const cookie = await cookies()

		await request(`user/${cookie.get('link_saved_user')?.value.split(':')[0]}/password`, {
			method: 'POST',
			body: JSON.stringify({ newPassword }),
			headers: {
				'Authorization': `Bearer ${btoa(cookie.get('link_saved_user')?.value ?? '')}`
			}
		})

		cookie.set('link_saved_user', `${cookie.get('link_saved_user')?.value.split(':')[0]}:${newPassword}`)
	},
	changeUsername: async (username: string) => {
		const cookie = await cookies()

		await request(`user/${cookie.get('link_saved_user')?.value.split(':')[0]}/username`, {
			method: 'POST',
			body: JSON.stringify({ username }),
			headers: {
				'Authorization': `Bearer ${btoa(cookie.get('link_saved_user')?.value ?? '')}`
			}
		})

		cookie.set('link_saved_user', `${username}:${cookie.get('link_saved_user')?.value.split(':')[1]}`)
	},
	toggleSubscription: async (from: number, to: number) => await request(`user/${(await cookies()).get('link_saved_user')?.value.split(':')[0]}`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${btoa((await cookies()).get('link_saved_user')?.value ?? '')}`
		},
		body: JSON.stringify({ from, to })
	}),
	checkSubscription: async (to: number) => {

	}
}