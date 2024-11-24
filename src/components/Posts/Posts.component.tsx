import type { ReactElement } from 'react'
import styles from './Posts.module.scss'
import type { IPost } from '@/shared/interfaces/IPost.interface'
import { exists } from '@/functions/exists'

import { Post } from './Post/Post.component'
import type { IUser } from '@/shared/interfaces/IUser.interface'
import { Card } from '@/ui/components/Card/Card.component'
import { Button } from '@/ui/components/Button/Button.component'
import { getCurrentAuth } from '@/services/Prisma/user/getCurrentAuth'
import { Popup } from '@/ui/components/Popup/Popup.component'
import { PopupTrigger } from '@/ui/components/PopupTrigger/PopupTrigger.component'
import { PopupWrapper } from '@/ui/components/PopupWrapper/PopupWrapper.component'

export const Posts = async (props: { posts: IPost[], controls?: boolean, restore?: boolean, author?: IUser }): Promise<ReactElement> => {
	const self = await getCurrentAuth()

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
			{props.posts
				? props.posts?.map((post) =>
					<Post self={self?.data} key={exists(post.id)} restore={props.restore} controls={props.controls} author={props.author} post={post} />
				).reverse()
				: 'Разорвано подключение с базой данных. Сообщите об ошибке по ссылке: github.com/ifb24m/link/issues'}
			<Card className={styles.end}>
				<h2 className={styles.title}>Вы дошли до конца</h2>
				<p className={styles.description}>Вы можете вернуться в ленту, чтобы прочитать новые посты или найти новых пользователей</p>
				<Button className={styles.homeButton} href="/" appearance="primary">На главную</Button>
			</Card>
		</div>
	)
}
