'use client'

import { useMarked } from '@/hooks/useMarked'
import { type ReactElement } from 'react'

import styles from './Markdown.module.scss'
import { Spinner } from '@/ui/components/Spinner/Spinner.component'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

export const Markdown = ({ children }: { children: string }): ReactElement => {
	const marked = useMarked(children)
	let post = marked?.split('<table>').join('<div><table>').split('</table>').join('</div></table>')

	const usernames = post?.match(/@\w+/gm)

	usernames?.forEach(username => {
		post = post?.split(username).join(`<a href="/user/${username.split('@')[1]}">${username}</a>`)
	})

	const videos = post?.match(/&gt;\[.+\..+\/.+\.mp4\]/gm)

	return (typeof post === 'string'
		? <div className={styles.markdown}
			dangerouslySetInnerHTML={{
				__html: post
			}}></div>
		: <>
			<Skeleton width="100%" height={20} />
			<Skeleton width="100%" height={20} />
			<Skeleton width="100%" height={20} />
		</>
	)
}
