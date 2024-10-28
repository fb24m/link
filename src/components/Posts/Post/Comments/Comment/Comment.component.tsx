import type { ReactElement } from 'react'
import type { CommentProps } from './Comment.props'
import styles from './Comment.module.scss'
import { formatContent } from '../../formatContent'
import { Card } from '@/ui/components/Card/Card.component'
import { formatDate } from '../../formatDate'
import { getUser } from '@/services/Prisma/user/get'

export const Comment = async (props: CommentProps): Promise<ReactElement> => {
	const user = await getUser(props.comment.authorId)

	return (
		<Card>
			<strong className={styles.username}>
				{user?.username} <span className={styles.date}>{formatDate(props.comment.publishDate)}</span>
			</strong>
			<p className={styles.content} dangerouslySetInnerHTML={{ __html: formatContent(props.comment.content) }}></p>
		</Card>
	)
}
