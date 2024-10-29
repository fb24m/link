'use client'

import { Input } from '@/ui/components/Input/Input'
import { useState } from 'react'

export const LinksBlock = () => {
	const allLinks = {
		'Telegram': 'https://t.me/',
		'GitHub': 'https://github.com/user/',
		'YouTube': 'https://www.youtube.com/',
		'Steam': 'https://steamcomminity.com/user/',
		'NameMC': 'https://namemc.org/',
		'Xbox': '',
		'Сайт': 'fb24m.ru'
	}
	const [links, setLinks] = useState<string[]>([])

	return (
		<div>
			<Input onInput={(e) => {
				// @ts-expect-error
				setLinks(Object.keys(allLinks).filter((link) => link.toLowerCase().includes(e.target.value.toLowerCase())))
			}} />
			{links.join(', ')}
		</div>
	)
}