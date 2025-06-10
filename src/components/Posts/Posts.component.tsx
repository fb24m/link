import type { ReactElement } from 'react'
import styles from './Posts.module.scss'

import { Post } from './Post/Post.component'
import { Card } from '@/ui/components/Card/Card.component'
import { Button } from '@/ui/components/Button/Button.component'
import { users } from '@/shared/api/users'
import { Popup } from '@/ui/components/Popup/Popup.component'
import { PopupTrigger } from '@/ui/components/PopupTrigger/PopupTrigger.component'
import { PopupWrapper } from '@/ui/components/PopupWrapper/PopupWrapper.component'
import Icon from '@/ui/components/Icon/Icon.component'
import Link from 'next/link'
import { Markdown } from '../Markdown/Markdown.component'
import { ActionButton } from '../ActionButton/ActionButton.component'
import { unpin } from './unpin.action'
import { Post as PostType, User } from '@prisma/client'
import { posts } from '@/shared/api/posts'
import { prisma } from '@/services/Prisma.service'

export const Posts = async ({ author, posts: Posts, controls, restore }: { posts: PostType[], controls?: boolean, restore?: boolean, author?: User }): Promise<ReactElement> => {
	const self = await users.getMe()

	const pinnedPostId = author && author?.pinned
	const [pinnedPost] = await posts.getById(pinnedPostId ?? 0)

	let getAuthor = (_: number) => author

	if (!author) {
		const authors = await prisma.user.findMany({
			where: { id: { in: Array.from(new Set(Posts.map(p => p.authorId ?? 0))) } }
		})

		getAuthor = (id: number) => author ?? authors.filter(a => a.id === id)[0]
	}

	return (
		<div className={styles.posts}>
			<Card className={styles.newDesignReview}>
				NextLink получил обновленный дизайн
				<Popup topCloseButton>
					<PopupTrigger>
						<Button appearance="primary">Оставить отзыв</Button>
					</PopupTrigger>
					<PopupWrapper className={styles.googleFormPopup}>
						<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdC3_z9OoJbUqFYpiN6HwWTfyrhta8boTBJROyE8UoYpVdOPA/viewform?embedded=true" width="640" height="762" className={styles.googleFormIframe}>Loading…</iframe>
					</PopupWrapper>
				</Popup>
			</Card>

			{!pinnedPost && (self.id === author?.id) && <Card className={styles.pinPost}>
				<div className={styles.content}>
					<span>Расскажите о себе при помощи закрепленного поста</span>
					<span className={styles.pinPostSmallText}>эту рекомендацию видите только вы</span>
				</div>
				<Button appearance="primary" href="/article/190">Подробнее</Button>
			</Card>}

			{pinnedPost && <Card className={styles.pinned}>
				<img className={styles.blurredAvatar} src={author?.avatar ?? undefined} alt="" />
				<div className={styles.pinnedContent}>
					<Link className={styles.pinnedLink} href={`/article/${pinnedPost.id}`}>
						<Icon icon="keep" />
						<Markdown className={styles.pinnedContentTitle}>{pinnedPost.content.split('\n')[0].split('<br>')[0]}</Markdown>
					</Link>

					<ActionButton action={unpin} icon="keep_off" appearance="primary" />
				</div>
			</Card>}

			{Posts && (Posts?.map((post) =>
				<Post self={self.data} key={post.id} restore={restore} controls={controls} author={getAuthor(post.authorId ?? 0)} post={post} />
			)).reverse()}

			<Card className={styles.end}>
				<h2 className={styles.title}>{Posts.length !== 0 ? 'Вы дошли до конца' : 'Тут пока нет постов'}</h2>
				<p className={styles.description}>{Posts.length !== 0 ? 'Вы можете вернуться в ленту, чтобы прочитать новые посты или найти новых пользователей' : 'Начните писать сами или подпишитесь на кого-нибудь из пользователей, чтобы читать его посты в ленте'}</p>
				<Button className={styles.homeButton} href="/" appearance="primary">На главную</Button>
			</Card>
		</div >
	)
}
