'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export const pin = async (formData: FormData) => {
	const id = formData.get('id')

	if (!id) {
		return
	}

	const response = await fetch(`${process.env.API}/user/${(await cookies()).get('link_saved_user')?.value.split(':')[0]}/pin`, {
		method: 'post',
		body: JSON.stringify({ id: +id }),
		headers: {
			'Authorization': `Bearer ${btoa((await cookies()).get('link_saved_user')?.value ?? '')}`
		}
	})

	console.log(response)

	const json = await response.json()

	console.log(json)

	revalidateTag('user')
}