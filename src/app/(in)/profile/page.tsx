import type { ReactElement } from 'react'
import styles from './page.module.scss'

import { Box } from '@/ui/components/Box/Box.component'
import { exists } from '@/functions/exists'
import { UserProfile } from '@/widgets/UserProfile/UserProfile.component'
import { Button } from '@/ui/components/Button/Button.component'
import { Posts } from '@/components/Posts/Posts.component'
import { redirect } from 'next/navigation'
import { posts } from '@/shared/api/posts'
import { users } from '@/shared/api/users'

const Welcome = async (): Promise<ReactElement> => {
	const user = await users.getMe()

	if (!user) { redirect('/login') }

	const myposts = await posts.getByAuthorId(user.id)

	return (
		<div className={styles.profile}>
			<UserProfile postsCount={exists<number>(myposts?.length)} selfProfile user={user} />
			<Box direction="row" alignItems="start" gap={8} className={styles.box}>
				<Button appearance="primary" icon="person" href="/profile">Профиль</Button>
				<Button appearance="secondary" icon="delete" href="/profile/deleted">Удаленные</Button>
				<Button appearance="secondary" icon="star" href="/profile/saved">Избранное</Button>
				<Button appearance="transparent" icon="add_circle" href="/post">Новый пост</Button>
			</Box>
			{/* TODO: fix typification */}
			<Posts controls author={user} posts={myposts ? myposts.filter((post: any) => !post.deleted) : []} />
		</div>
	)
}

export default Welcome
