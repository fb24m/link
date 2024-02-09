import { Editor } from '@/components/Editor/Editor.component'
import type { ReactElement } from 'react'

const Post = (): ReactElement => {
	const now = new Date()

	return (
		<Editor publishDate={now} new />
	)
}

export default Post
