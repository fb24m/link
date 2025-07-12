'use server'

import { cookies } from 'next/headers'

const allLinks: Record<string, string> = {
	'telegram': 't.me/',
	'github': 'github.com/user/',
	'youtube': 'www.youtube.com/',
	'steam': 'steamcomminity.com/user/id/',
	'namemc': 'namemc.org/',
	'xbox': 'xbox.com/play/user/',
	'tiktok': 'tiktok.com/',
	'linkedin': 'www.linkedin.com/',
	'instagram': 'www.instagram.com/',
	'facebook': 'www.facebook.com/',
	'x': 'x.com/',
}

export const updateLinks = async (_: unknown, formData: FormData) => {
	const cookie = await cookies()
	const links: Record<string, string> = {}

	formData.forEach((value, key: string) => {
		links[key] = value as string
	})

	const keys = Object.keys(links).filter(key => links[key] && key[0] !== '$')

	// await fetch(`${API}/users/${cookie.get('link_saved_user')?.value.split(':')[0]}/links`, {
	// 	method: 'POST',
	// 	body: JSON.stringify({

	// 		link: allLinks[]
	// 	}),
	// 	headers: {
	// 		'Authorization': `Bearer ${btoa(cookie.get('link_saved_user')?.value ?? '')}`
	// 	}
	// })

	console.log(keys)
}