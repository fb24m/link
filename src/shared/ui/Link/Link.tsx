'use client'
import { useRouter } from 'next/navigation'
import { AllHTMLAttributes } from 'react'

export const Link = (props: AllHTMLAttributes<HTMLHyperlinkElementUtils>) => {
	const { push, prefetch } = useRouter()

	return (
		<a {...props} onClick={(e) => {
			e.preventDefault()

			document.startViewTransition(() => {
				document.body.style.opacity = '0'
				push(props.href ?? '')
			}).finished.then(() => {
				document.body.style.opacity = '1'
			})
		}} onMouseEnter={() => { prefetch(props.href ?? '') }}></a>
	)
}