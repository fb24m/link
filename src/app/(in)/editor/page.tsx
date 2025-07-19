import { Editor } from '@/widgets/Editor/Editor.component'
import type { ReactElement } from 'react'

const Post = async (): Promise<ReactElement> => {
  const now = new Date()

  return <Editor publishDate={now} new />
}

export default Post
