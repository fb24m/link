import type { ReactElement } from 'react'
import type { PostProps } from './Post.props'
import { Link } from '@/shared/ui/Link/Link'
import { movePostToDeleted } from '@/actions/movePostToDeleted.action'

import { restorePost } from '@/actions/restorePost'

import { Comments } from './Comments/Comments.component'
import { Box } from '@/ui/components/Box/Box.component'
import { Markdown } from '@/components/Markdown/Markdown.component'
import { ActionButton } from '@/components/ActionButton/ActionButton.component'
import { Button } from '@/ui/components/Button/Button.component'
import { Card } from '@/ui/components/Card/Card.component'
import { CopyButton } from '@/components/CopyButton/CopyButton.component'
import { DateFormat } from '@/entities/Date/Date'

import { prisma } from '@/services/Prisma.service'
import { saveArticle } from '@/actions/saveArticle.action'
import { checkSavedPost } from '@/services/Prisma/post/checkSaved'

import styles from './Post.module.scss'
import { ReadMore } from '@/entities/post/ReadMore'
import { users } from '@/shared/api/users'
import { pin } from '../pin.action'

const maxContentLength = 500

export const Post = async ({ full, post, restore, controls, ...props }: PostProps): Promise<ReactElement> => {
	const { id, authorId, content: rawContent, publishDate } = post

	if (!authorId) return <></>

	const author = props.author ?? (await users.get(authorId)).data

	let content = rawContent.split('<br>').join('\n')
	const comments = await prisma.comment.findMany({ where: { postId: id } })

	if (content.match(/(<script|<style|<head|style=)/g))
		return <hr style={{ borderColor: 'var(--medium-color)' }} />

	const isIncomplete = content.length > maxContentLength && !full

	if (isIncomplete)
		content = content.substring(0, maxContentLength) + '...'

	return (
		<>
			<Card mobileShrink className={styles.post} id={`post-${id}`}>
				<div className={styles.author}>
					<img src={author?.avatar ?? undefined} className={styles.avatar} />
					<div className={styles.userdata}>
						<Link href={`/user/${author?.username}`} className={styles.name}>{author?.username}</Link>
						<span className={styles.date}>
							<DateFormat format={!full ? 'relative' : undefined} date={new Date(publishDate ?? '')} />
						</span>
					</div>
					{controls && <div className={styles.actions}>
						<Button appearance="transparent" icon="edit" href={`/edit/${id}`}></Button>
						<ActionButton appearance="transparent" icon="keep" fields={[{ name: 'id', value: id }]} action={pin} />
						{restore
							? <ActionButton appearance="primary" icon="restore_from_trash" fields={[{ name: 'post-id', value: id }]} action={restorePost} />
							: <ActionButton appearance="transparent" icon="delete" fields={[{ name: 'post-id', value: id }]} action={movePostToDeleted} />}
					</div>}
				</div>

				<Markdown>{content}</Markdown>

				<ReadMore className={styles.readMore} show={isIncomplete} postId={id}>Читать далее</ReadMore>

				<div className={styles.interaction}>
					<Box gap={8} direction="row" className={styles.interactionButtons}>
						{!full &&
							<Button className={styles.interactionButton} icon="chat" appearance="secondary" href={`/article/${id}#comments`}>Комментарии ({comments.length})</Button>
						}
						<CopyButton className={styles.interactionButton} success="Ссылка на пост скопирована" text={`https://link.fb24m.ru/article/${id}`} icon="share" appearance="secondary">Поделиться</CopyButton>
						{props.self &&
							<ActionButton
								action={saveArticle}
								appearance="secondary"
								icon="save"
								fields={[{ name: 'post-id', value: id }]}>
								{(await checkSavedPost(props.self, id)) ? 'Удалить из сохраненных' : 'Сохранить'}
							</ActionButton>}
					</Box>
				</div>

			</Card>
			{full && <Comments postId={id} />}
		</>
	)
}
