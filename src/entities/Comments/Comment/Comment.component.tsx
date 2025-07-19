import type { ReactElement } from 'react'
import type { CommentProps } from './Comment.props'
import styles from './Comment.module.scss'
import { Card } from '@/ui/components/Card/Card.component'
import { formatDate } from '../../../shared/utils/formatDate'
import { users } from '@/shared/api/users'

export const Comment = async (props: CommentProps): Promise<ReactElement> => {
  const user = await users.get(props.comment.authorId)

  return (
    <Card>
      <strong className={styles.username}>
        {user?.username} <span className={styles.date}>{formatDate(props.comment.publishDate)}</span>
      </strong>
      <p className={styles.content}>{props.comment.content}</p>
    </Card>
  )
}
