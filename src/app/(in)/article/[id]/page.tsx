import { getPostById } from '@/services/Prisma/post/getById'

import styles from './page.module.scss'

import type { ReactElement } from 'react'
import type { Metadata } from 'next'
import { exists } from '@/functions/exists'
import { BackButton } from '@/components/BackButton/BackButton.component'
import { Post } from '@/components/Posts/Post/Post.component'
import { users } from '@/shared/api/users'

export const generateMetadata = async (props: { params: Promise<{ id: string }> }): Promise<Metadata> => {
	const params = await props.params;
	const post = await getPostById(+params.id)
	const author = await users.get(+exists(post?.authorId))

	return {
		title: `Пост ${author?.username} на NextLink`,
		description: `${post?.content.slice(0, 100).split('\n').join('')}...`,
		openGraph: {
			title: `Пост ${author?.username} на NextLink`,
			description: `${post?.content.slice(0, 100).split('\n').join('')}...`
		}
	}
}

const Article = async (props: { params: Promise<{ id: string }> }): Promise<ReactElement> => {
	const { id } = await props.params
	const post = await getPostById(+id)

	return (
		<div>
			<BackButton appearance="transparent" icon="arrow_back" className={styles.button}>Назад</BackButton>
			<Post full post={exists(post)} ></Post>
		</div>
	)
}

export default Article
