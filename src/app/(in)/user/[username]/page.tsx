'use server'

import type { ReactElement } from 'react'

import type { Metadata } from 'next'
import { Container } from '@/components/Container/Container.component'
import { UserProfile } from '@/widgets/UserProfile/UserProfile.component'
import { Posts } from '@/components/Posts/Posts.component'
import { notFound, redirect } from 'next/navigation'
import styles from './page.module.scss'
import { getCurrentAuth } from '@/services/Prisma/user/getCurrentAuth'
import { users } from '@/shared/api/users'
import { posts } from '@/shared/api/posts'

export const generateMetadata = async (props: { params: Promise<{ username: string }> }): Promise<Metadata> => {
	const { username } = await props.params
	const { bio } = await users.getByUsername(username)

	return {
		title: `Профиль ${username} в NextLink`,
		description: bio ?? 'Описание отсутствует',
		openGraph: {
			title: `Профиль ${username} в NextLink`,
			description: bio ?? 'Описание отсутствует'
		}
	}
}

const Welcome = async (props: { params: Promise<{ username: string }> }): Promise<ReactElement> => {
	const user = await users.getByUsername((await props.params).username)

	if (!user) notFound()

	const self = await getCurrentAuth()
	const myposts = await posts.getByAuthorId(user.id)

	if (self?.data?.username === user.data?.username) redirect('/profile')

	if (!myposts.length) return <Container />

	return (
		<div className={styles.user}>
			<UserProfile user={user} postsCount={myposts.length} />
			<Posts author={user} posts={myposts} />
		</div>
	)
}

export default Welcome
