'use server'

import type { ReactElement } from 'react'

import type { Metadata } from 'next'
import { Container } from '@/components/Container/Container.component'
import { UserProfile } from '@/widgets/UserProfile/UserProfile.component'
import { Posts } from '@/components/Posts/Posts.component'
import { notFound, redirect } from 'next/navigation'
import styles from './page.module.scss'
import { users } from '@/shared/api/users'
import { posts } from '@/shared/api/posts'
import { Card } from '@/ui/components/Card/Card.component'
import Icon from '@/ui/components/Icon/Icon.component'

export const generateMetadata = async (props: { params: Promise<{ username: string }> }): Promise<Metadata> => {
	const { username } = await props.params
	const { bio } = await users.get(username)

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
	const user = await users.get((await props.params).username)

	if (!user) notFound()

	const self = await users.getMe()
	const myposts = await posts.getByAuthorId(user.id)

	if (self?.username === user.username) redirect('/profile')

	if (!myposts.length) return <Container />

	return (
		<div className={styles.user}>
			<UserProfile user={user} postsCount={myposts.length} />
			{user.suspended && <Card className={styles.suspendCard}>
				<Icon icon="lock" className={styles.lockIcon}></Icon>
				<h2 className={styles.suspendTitle}>Этот профиль был заблокирован</h2>
				<p className={styles.suspendDescription}>
					Поэтому больше просматривать посты связанные с ним нельзя.
				</p>
			</Card>}
			{!user.suspended && <Posts author={user} posts={myposts} />}
		</div>
	)
}

export default Welcome
