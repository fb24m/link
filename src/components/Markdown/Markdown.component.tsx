'use client'

import { useMarked } from '@/hooks/useMarked'
import { type ReactElement } from 'react'

import styles from './Markdown.module.scss'

export const Markdown = ({ children }: { children: string }): ReactElement => {
	const marked = useMarked(children)
	let post = marked.split('<table>').join('<div><table>').split('</table>').join('</div></table>')

	const usernames = post.match(/@\w+/gm)

	usernames?.forEach(username => {
		post = post.split(username).join(`<a href="/user/${username.split('@')[1]}">${username}</a>`)
	})

	return (
		<div className={styles.markdown}
			dangerouslySetInnerHTML={{
				__html: post
			}}></div>
	)
}
