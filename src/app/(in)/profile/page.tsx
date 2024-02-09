import type { ReactElement } from 'react'
import styles from './page.module.scss'

import { Box } from '@/ui/components/Box/Box.component'
import { exists } from '@/functions/exists'
import { UserProfile } from '@/components/UserProfile/UserProfile.component'
import { Container } from '@/components/Container/Container.component'
import { Button } from '@/ui/components/Button/Button.component'
import { Posts } from '@/components/Posts/Posts.component'
import { getPosts } from '@/services/Prisma/post/getPosts'
import { parseUser } from '@/functions/parseUser'
import { redirect } from 'next/navigation'

const Welcome = async (): Promise<ReactElement> => {
	const user = await parseUser(true)

	if (!user) { redirect('/login') }

	if (!user.data) return <Container>{user.message}</Container>

	const posts = await getPosts({ authorId: [exists(user?.data.id)] })

	return (
		<div>
			<UserProfile postsCount={exists<number>(posts.data?.length)} selfProfile user={user.data} />
			<Box direction="row" alignItems="start" gap={8} className={styles.box}>
				<Button appearance="primary" icon="person" href="/profile">Профиль</Button>
				<Button appearance="secondary" icon="delete" href="/profile/deleted">Удаленные</Button>
				<Button appearance="secondary" icon="star" href="/profile/saved">Избранное</Button>
				<Button appearance="transparent" icon="add_circle" href="/post">Новый пост</Button>
			</Box>
			<Posts controls posts={posts.data ? posts.data : []} />
		</div>
	)
}

export default Welcome
