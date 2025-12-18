import type { ReactElement } from 'react'
import { exists } from '@/functions/exists'
import { Editor } from '@/widgets/Editor/Editor.component'
import { posts } from '@/shared/api/posts'

const Post = async (props: { params: Promise<{ id: string }> }): Promise<ReactElement> => {
  const params = await props.params
  const [post] = await posts.getById(+params.id)

  return <Editor post={exists(post)} />
}

export default Post
