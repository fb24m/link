import { addComment } from '@/actions/addComment.action'
import { prisma } from '@/services/Prisma.service'
import type { ReactElement } from 'react'
import { Comment } from './Comment/Comment.component'
import styles from './Comments.module.scss'
import { Title1 } from '@/ui/components/Title1/Title1.component'
import { Card } from '@/ui/components/Card/Card.component'
import { Input } from '@/ui/components/Input/Input'
import { SubmitButton } from '@/components/SubmitButton/SubmitButton.component'
import Link from 'next/link'
import { users } from '@/shared/api/users'

export const Comments = async ({ postId }: { postId: number }): Promise<ReactElement> => {
	const comments = await prisma.comment.findMany({
		where: { postId }
	})

	console.log(comments)

	return (
		<>
			<Title1 className={styles.title}>Комментарии</Title1>
			<Card className={styles.card} id="comments">
				{(await users.getMe())?.ok
					? <form action={addComment} className={styles.form}>
						<Input placeholder="Напишите комментарий..." className={styles.input} name="text" />
						<input name="post-id" value={postId} readOnly style={{ display: 'none' }} />
						<SubmitButton className={styles.button} appearance="primary">Оставить комментарий</SubmitButton>
					</form>
					: <>
						<Link href="/login">Войдите</Link> или <Link href="/sinup">зарегистрируйтесь</Link>, чтобы писать комментарии
					</>}
			</Card>
			<div className={styles.comments}>
				{comments.length !== 0 ? comments?.map((comment) => <Comment key={comment.id} comment={comment} />).reverse() : 'Ваш комментарий будет первым!'}
			</div>
		</>
	)
}
