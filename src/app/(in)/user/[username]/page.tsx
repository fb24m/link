'use server'

import type { ReactElement } from 'react'

import { exists } from '@/functions/exists'

import type { Metadata } from 'next'
import { Container } from '@/components/Container/Container.component'
import { UserProfile } from '@/components/UserProfile/UserProfile.component'
import { Posts } from '@/components/Posts/Posts.component'
import type { IUser } from '@/interfaces/IUser.interface'
import { getPosts } from '@/services/Prisma/post/getPosts'
import { getUser } from '@/services/Prisma/getUser'
import { redirect } from 'next/navigation'
import { parseUser } from '@/functions/parseUser'

export const generateMetadata = async (props: { params: { username: string } }): Promise<Metadata> => {
	const user = await getUser({ username: props.params.username }, 'profile')

	return {
		title: `Профиль ${user?.data?.username} в NextLink`,
		description: `${exists(user?.data?.bio) !== '' ? user?.data?.bio : 'Описание отсутствует'}`,
		openGraph: {
			title: `Профиль ${user?.data?.username} в NextLink`,
			description: `${exists(user?.data?.bio) !== '' ? user?.data?.bio : 'Описание отсутствует'}`
		}
	}
}

const Welcome = async (props: { params: { username: string } }): Promise<ReactElement> => {
	const user = await getUser({ username: props.params.username })
	const posts = await getPosts({ authorId: [exists(user?.data?.id)] })
	const self = await parseUser(false, 'user')

	if (self?.data?.username === user.data?.username) {
		redirect('/profile')
	}

	if (!user || !user.ok) return <Container>{user.message}</Container>
	if (!posts || !posts.data) return <Container>{posts.message}</Container>

	return (
		<div>
			<UserProfile user={exists<IUser>(user.data)} postsCount={posts.data.length} />
			<Posts author={user.data} posts={posts.data} />
		</div>
	)
}

export default Welcome
