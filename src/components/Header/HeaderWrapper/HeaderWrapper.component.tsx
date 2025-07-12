'use client'

import { useState, type ReactNode, useEffect } from 'react'

export const HeaderWrapper = ({ children, scrollClass }: { children: ReactNode, scrollClass: string }): ReactNode => {
	const [className, setClassName] = useState('')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', () => {
				if (window.scrollY >= 20) {
					setClassName(scrollClass)
				} else {
					setClassName('')
				}
			})
		}
	}, [])

	return (
		<header className={className}>{children}</header>
	)
}
