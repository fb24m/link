import type { ReactElement } from 'react'

import styles from '../page.module.scss'
import { Box } from '@/ui/components/Box/Box.component'
import { Container } from '@/components/Container/Container.component'
import { UserProfile } from '@/widgets/UserProfile/UserProfile.component'
import { Button } from '@/ui/components/Button/Button.component'
import { Posts } from '@/components/Posts/Posts'
import { getPosts } from '@/services/Prisma/post/getPosts'
import { redirect } from 'next/navigation'
import { users } from '@/shared/api/users'

const Welcome = async (): Promise<ReactElement> => {
	const user = await users.getMe()

	if (!user) { redirect('/login') }

	const savedPosts = user?.savedArticles?.split('/')
	const items = savedPosts?.map((item: string) => +item.replace('/', ''))
		.filter((item: number) => !isNaN(item))

	const posts = await getPosts(typeof items !== 'undefined' ? { id: items } : { id: [0] })

	// if (typeof user.data === 'undefined') return <Container>{user.message}</Container>

	if (!posts.ok || !posts.data) return <Container>{posts.message}</Container>

	return (
		<div>
			<UserProfile selfProfile user={user} postsCount={posts.data.length} />
			<Box direction="row" alignItems="start" gap={8} className={styles.box}>
				<Button appearance="secondary" icon="person" href="/profile">Профиль</Button>
				<Button appearance="secondary" icon="delete" href="/profile/deleted">Удаленные</Button>
				<Button appearance="primary" icon="star" href="/profile/saved">Избранное</Button>
				<Button appearance="transparent" icon="add_circle" href="/post">Новый пост</Button>
			</Box>
			<Posts posts={posts.data} />
		</div>
	)
}

export default Welcome
