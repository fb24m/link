import type { ReactElement } from 'react'
import styles from './page.module.scss'

import { Box } from '@/ui/components/Box/Box.component'
import { exists } from '@/functions/exists'
import { UserProfile } from '@/components/UserProfile/UserProfile.component'
import { Container } from '@/components/Container/Container.component'
import { Button } from '@/ui/components/Button/Button.component'
import { Posts } from '@/components/Posts/Posts.component'
import { getPosts } from '@/services/Prisma/post/getPosts'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const Welcome = async (): Promise<ReactElement> => {
	const userData = (await cookies()).get('link_saved_user')?.value
	const userResponse = await fetch(`https://link.fb24m.ru/api/user/${userData?.split(':')[0]}`)

	const user = (await userResponse.json()).user

	if (!userResponse.ok || !user || !userData) { redirect('/login') }

	if (!user) return <Container>{user.message}</Container>

	const response = await fetch(`https://link.fb24m.ru/api/posts?authorId=${user.id}`)
	const posts = await response.json()

	return (
		<div className={styles.profile}>
			<UserProfile postsCount={exists<number>(posts.data?.length)} selfProfile user={user} />
			<Box direction="row" alignItems="start" gap={8} className={styles.box}>
				<Button appearance="primary" icon="person" href="/profile">Профиль</Button>
				<Button appearance="secondary" icon="delete" href="/profile/deleted">Удаленные</Button>
				<Button appearance="secondary" icon="star" href="/profile/saved">Избранное</Button>
				<Button appearance="transparent" icon="add_circle" href="/post">Новый пост</Button>
			</Box>
			<Posts controls author={user} posts={posts.data ? posts.data : []} />
		</div>
	)
}

export default Welcome
