import type { ReactElement } from 'react'
import styles from './Posts.module.scss'
import type { IPost } from '@/interfaces/IPost.interface'
import { exists } from '@/functions/exists'

import { Post } from './Post/Post.component'
import { parseUser } from '@/functions/parseUser'
import type { IUser } from '@/interfaces/IUser.interface'

export const Posts = async (props: { posts: IPost[], controls?: boolean, restore?: boolean, author?: IUser }): Promise<ReactElement> => {
	const self = await parseUser(false, '[rendering] Posts, parsing self')

	return (
		<div className={styles.posts}>
			{props.posts
				? props.posts?.map((post) =>
					<Post self={self?.data} key={exists(post.id)} id={post.id} restore={props.restore} controls={props.controls} publishDate={post?.publishDate} author={props.author} authorId={exists(post.authorId)} content={post?.content.split('\r\n').join('<br>')} />
				).reverse()
				: 'Разорвано подключение с базой данных. Сообщите об ошибке по ссылке: github.com/ifb24m/link/issues'}
		</div>
	)
}
