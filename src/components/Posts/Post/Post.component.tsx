import type { ReactElement } from 'react'
import styles from './Post.module.scss'
import type { PostProps } from './Post.props'
import Link from 'next/link'
import { formatDate } from './formatDate'
import { exists } from '@/functions/exists'
import { movePostToDeleted } from '@/actions/movePostToDeleted.action'
import { restorePost } from '@/actions/restorePost'
import { Comments } from './Comments/Comments.component'
import { prisma } from '@/services/Prisma.service'
import { Box } from '@/ui/components/Box/Box.component'
import { Markdown } from '@/components/Markdown/Markdown.component'

import { ActionButton } from '@/components/ActionButton/ActionButton.component'
import { Button } from '@/ui/components/Button/Button.component'
import { Card } from '@/ui/components/Card/Card.component'
import { CopyButton } from '@/components/CopyButton/CopyButton.component'
import { getUser } from '@/services/Prisma/getUser'
import { saveArticle } from '@/actions/saveArticle.action'
import { checkSavedPost } from '@/services/Prisma/post/checkSaved'

const maxContentLength = 500

export const Post = async (props: PostProps): Promise<ReactElement> => {
	const author = props.author ? props.author : (await getUser({ id: props.authorId }, `[Post] rendering, getting user  ${props.authorId}`)).data

	// let content = props.content
	let content = props.content.split('<br>').join('\n')
	const comments = await prisma.comment.findMany({ where: { postId: props.id } })

	if (content.includes('<script') || content.includes('<style') || content.includes('<head')) {
		content = `<span class="${styles.warning}">Этот пост создает угрозу работе сайта. Поэтому он был удален</span>`
	}

	if (content.length >= maxContentLength && !exists(props.full)) {
		content = content.substring(0, maxContentLength) + '...'
	}

	if (content.includes('style=')) {
		content = `<span class="${styles.warning}">
		Запрещено использовать аттрибут style в постах!
		</span>`
	}

	return (
		<>
			<Card className={styles.post}>
				<div className={styles.author}>
					<img src={exists(author?.avatar)} className={styles.avatar}></img>
					<div className={styles.userdata}>
						<Link href={`/user/${author?.username}`} className={styles.name}>{author?.username}</Link>
						<span className={styles.date}>{formatDate(props.publishDate)}</span>
					</div>
					{exists(props.controls) || props.controls === true
						? <div className={styles.actions}>
							<Button appearance="transparent" icon="edit" href={`/edit/${props.id}`}></Button>
							{props.restore !== true
								? <ActionButton appearance="transparent" icon="delete" fields={[{ name: 'post-id', value: `${props.id}` }]} action={movePostToDeleted}></ActionButton>
								: <ActionButton appearance="primary" icon="restore_from_trash" fields={[{ name: 'post-id', value: `${props.id}` }]} action={restorePost}></ActionButton>}
						</div>
						: ''}
				</div>
				<Markdown>
					{content}
				</Markdown>
				{content.length >= maxContentLength && props.full !== true &&
					<Link className={styles.readMore} href={`/article/${props.id}`}>Читать далее</Link>
				}

				<div className={styles.interaction}>
					<Box gap={8} direction="row" className={styles.interactionButtons}>
						{props.full !== true &&
							<Button className={styles.interactionButton} icon="chat" appearance="secondary" href={`/article/${props.id}#comments`}>Комментарии ({comments.length})</Button>
						}
						<CopyButton className={styles.interactionButton} success="Ссылка на пост скопирована" text={`https://link.fb24m.ru/article/${props.id}`} icon="share" appearance="secondary">Поделиться</CopyButton>
						{props.self
							? <ActionButton
								action={saveArticle}
								appearance="secondary"
								icon="save"
								fields={[{ name: 'post-id', value: `${props.id}` }]}>
								{(await checkSavedPost(props.self, props.id)) ? 'Удалить из сохраненных' : 'Сохранить'}
							</ActionButton>
							: ''}
					</Box>
				</div>

			</Card>
			{props.full === true &&
				<Comments postId={props.id} />
			}
		</>
	)
}
