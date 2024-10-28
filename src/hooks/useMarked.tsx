import { useEffect, useState } from 'react'
import { marked } from 'marked'
// const marked =
// import { isPromise } from 'util/types'

export const useMarked = (markdown: string): string | undefined => {
	const [html, setHtml] = useState<string | undefined>()

	useEffect(() => {
		const parse = async (): Promise<void> => {
			const md = await marked.parse(markdown)

			if (md !== '') setHtml(md)
		}
		parse().catch((e) => { console.error(e) })
	}, [])

	return html
}
