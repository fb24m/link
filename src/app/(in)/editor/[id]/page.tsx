import { getPostById } from '@/services/Prisma/post/getById'
import type { ReactElement } from 'react'
import { exists } from '@/functions/exists'
import { Editor } from '@/widgets/Editor/Editor.component'

const Post = async (props: { params: Promise<{ id: string }> }): Promise<ReactElement> => {
  const params = await props.params
  const post = await getPostById(+params.id)

  return <Editor post={exists(post)} />
}

export default Post
