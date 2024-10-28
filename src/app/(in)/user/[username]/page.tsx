'use server'

import type { ReactElement } from 'react'

import { exists } from '@/functions/exists'

import type { Metadata } from 'next'
import { Container } from '@/components/Container/Container.component'
import { UserProfile } from '@/components/UserProfile/UserProfile.component'
import { Posts } from '@/components/Posts/Posts.component'
import type { IUser } from '@/interfaces/IUser.interface'
import { getPosts } from '@/services/Prisma/post/getPosts'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'
import { getCurrentAuth } from '@/services/Prisma/user/getCurrentAuth'
import { users } from '@/shared/api/users'
import { posts } from '@/shared/api/posts'

export const generateMetadata = async (props: { params: Promise<{ username: string }> }): Promise<Metadata> => {
	const response = await fetch(`https://link.fb24m.ru/api/user/${(await props.params).username}`)
	const user = (await response.json()).user

	return {
		title: `Профиль ${user?.username} в NextLink`,
		description: `${exists(user?.bio) !== '' ? user?.data?.bio : 'Описание отсутствует'}`,
		openGraph: {
			title: `Профиль ${user?.username} в NextLink`,
			description: `${exists(user?.bio) !== '' ? user?.data?.bio : 'Описание отсутствует'}`
		}
	}
}

const Welcome = async (props: { params: Promise<{ username: string }> }): Promise<ReactElement> => {
	const user = await users.getByUsername((await props.params).username)
	const self = await getCurrentAuth()
	const myposts = await posts.getByAuthorId(user.id)

	if (self?.data?.username === user.data?.username) {
		redirect('/profile')
	}

	if (!users) return <Container></Container>
	if (!myposts.length) return <Container></Container>

	return (
		<div className={styles.user}>
			<UserProfile user={user} postsCount={myposts.length} />
			<Posts author={user} posts={myposts} />
		</div>
	)
}

export default Welcome
