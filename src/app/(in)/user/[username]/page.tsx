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

export const generateMetadata = async (props: { params: Promise<{ username: string }> }): Promise<Metadata> => {
	const response = await fetch(`http://localhost:3000/api/user/${(await props.params).username}`)
	const user = (await response.json()).user

	return {
		title: `Профиль ${user?.data?.username} в NextLink`,
		description: `${exists(user?.data?.bio) !== '' ? user?.data?.bio : 'Описание отсутствует'}`,
		openGraph: {
			title: `Профиль ${user?.data?.username} в NextLink`,
			description: `${exists(user?.data?.bio) !== '' ? user?.data?.bio : 'Описание отсутствует'}`
		}
	}
}

const Welcome = async (props: { params: Promise<{ username: string }> }): Promise<ReactElement> => {
	//const user = await getUser({ username: (await props.params).username })

	const userResponse = await fetch(`https://link.fb24m.ru/api/user/${(await props.params).username}`)
	const user = (await userResponse.json()).user

	const self = await getCurrentAuth()

	const postsResponse = await fetch(`https://link.fb24m.ru/api/posts?authorId=${user.id}`)
	const posts = (await postsResponse.json()).data


	if (self?.data?.username === user.data?.username) {
		redirect('/profile')
	}

	if (!user) return <Container></Container>
	if (!posts.length) return <Container></Container>

	return (
		<div className={styles.user}>
			<UserProfile user={user} postsCount={posts.length} />
			<Posts author={user} posts={posts} />
		</div>
	)
}

export default Welcome
