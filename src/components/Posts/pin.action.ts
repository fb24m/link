'use server'

import { cookies } from 'next/headers'

export const pin = async (formData: FormData) => {
	const id = formData.get('id')

	if (!id) {
		console.log('Id is undefined')
		return
	}

	await fetch(`${process.env.API}/user/${(await cookies()).get('link_saved_user')?.value.split(':')[0]}/pin`, {
		method: 'post',
		body: JSON.stringify({ id: +id }),
		headers: {
			'Authorization': `Bearer ${btoa((await cookies()).get('link_saved_user')?.value ?? '')}`
		}
	})
}