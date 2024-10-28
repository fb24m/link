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
import { posts } from '@/shared/api/posts'
import { users } from '@/shared/api/users'

const Welcome = async (): Promise<ReactElement> => {
	const userData = (await cookies()).get('link_saved_user')?.value

	const user = await users.getByUsername(userData?.split(':')[0] ?? '')

	if (!user || !userData) { redirect('/login') }

	const myposts = (await posts.getByAuthorId(user.id))

	return (
		<div className={styles.profile}>
			<UserProfile postsCount={exists<number>(myposts?.length)} selfProfile user={user} />
			<Box direction="row" alignItems="start" gap={8} className={styles.box}>
				<Button appearance="primary" icon="person" href="/profile">Профиль</Button>
				<Button appearance="secondary" icon="delete" href="/profile/deleted">Удаленные</Button>
				<Button appearance="secondary" icon="star" href="/profile/saved">Избранное</Button>
				<Button appearance="transparent" icon="add_circle" href="/post">Новый пост</Button>
			</Box>
			{/* TODO: fix typization */}
			<Posts controls author={user} posts={myposts ? myposts.filter((post: any) => !post.deleted) : []} />
		</div>
	)
}

export default Welcome
