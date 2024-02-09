import { getPostById } from '@/services/Prisma/post/getById'
import type { ReactElement } from 'react'
import { exists } from '@/functions/exists'
import { Editor } from '@/components/Editor/Editor.component'

const Post = async ({ params }: { params: { id: string } }): Promise<ReactElement> => {
	const post = await getPostById(+params.id)

	return (
		<Editor post={exists(post)} />
	)
}

export default Post
