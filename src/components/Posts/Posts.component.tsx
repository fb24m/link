import type { ReactElement } from 'react'
import styles from './Posts.module.scss'
import type { IPost } from '@/interfaces/IPost.interface'
import { exists } from '@/functions/exists'

import { Post } from './Post/Post.component'

export const Posts = async (props: { posts: IPost[], controls?: boolean, restore?: boolean }): Promise<ReactElement> => {
	return (
		<div className={styles.posts}>
			{props.posts
				? props.posts?.map((post) =>
					<Post key={exists(post.id)} id={post.id} restore={props.restore} controls={props.controls} publishDate={post?.publishDate} authorId={exists(post.authorId)} content={post?.content.split('\r\n').join('<br>')} />
				).reverse()
				: 'Разорвано подключение с базой данных. Сообщите об ошибке по ссылке: github.com/ifb24m/link/issues'}
		</div>
	)
}
