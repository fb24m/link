import type { ReactElement } from 'react'
import styles from './Posts.module.scss'
import type { IPost } from '@/shared/interfaces/IPost.interface'

import { Post } from './Post/Post.component'
import type { IUser } from '@/shared/interfaces/IUser.interface'
import { Card } from '@/ui/components/Card/Card.component'
import { Button } from '@/ui/components/Button/Button.component'
import { getCurrentAuth } from '@/services/Prisma/user/getCurrentAuth'
import { Popup } from '@/ui/components/Popup/Popup.component'
import { PopupTrigger } from '@/ui/components/PopupTrigger/PopupTrigger.component'
import { PopupWrapper } from '@/ui/components/PopupWrapper/PopupWrapper.component'
import { posts } from '@/shared/api/posts'
import Icon from '@/ui/components/Icon/Icon.component'
import Link from 'next/link'
import { SubmitButton } from '../SubmitButton/SubmitButton.component'
import { Markdown } from '../Markdown/Markdown.component'
import { ActionButton } from '../ActionButton/ActionButton.component'
import { unpin } from './unpin.action'

export const Posts = async ({ author, posts: Posts, controls, restore }: { posts: IPost[], controls?: boolean, restore?: boolean, author?: IUser }): Promise<ReactElement> => {
	const self = await getCurrentAuth()

	const pinnedPostId = author && author?.pinned
	const [pinnedPost] = await posts.getById(pinnedPostId ?? 0)

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

			{!pinnedPost && (self.data?.id === author?.id) && <Card className={styles.pinPost}>
				<div className={styles.content}>
					<span>
						Расскажите о себе при помощи закрепленного поста
					</span>
					<span className={styles.pinPostSmallText}>
						эту рекомендацию видите только вы
					</span>
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

			{
				Posts && Posts?.map((post) =>
					<Post self={self?.data} key={post.id} restore={restore} controls={controls} author={author} post={post} />
				).reverse()
			}
			<Card className={styles.end}>
				<h2 className={styles.title}>Вы дошли до конца</h2>
				<p className={styles.description}>Вы можете вернуться в ленту, чтобы прочитать новые посты или найти новых пользователей</p>
				<Button className={styles.homeButton} href="/" appearance="primary">На главную</Button>
			</Card>
		</div >
	)
}
