import styles from './Editor.module.scss'
import type { ReactElement, ReactNode } from 'react'
import { users } from '@/shared/api/users'
import { EditorArea } from '@/widgets/Editor/ui/EditorArea/EditorArea'
import { Post } from '../../../generated/prisma/client'
import { Sidebar } from './ui/Sidebar'

export interface EditorProps {
  post?: Post
  button?: ReactNode
  publishDate?: Date
  new?: boolean
  user?: { name: string | null }
}

export const Editor = async (props: EditorProps): Promise<ReactElement> => {
  const me = await users.getMe()
  const isGeminiReady = await users.geminiReady()

  return (
    <div className={styles.wrapper}>
      <Sidebar isNew={!!props.new} me={me} post={props.post} publishDate={props.publishDate} />
      <input type="text" style={{ display: 'none' }} name="id" readOnly value={props.post?.id} />
      <div className={styles.post}>
        <EditorArea defaultValue={props.post?.content.split('<br>').join('\n')} isGeminiReady={isGeminiReady} />
      </div>
    </div>
  )
}
