import type { ReactElement } from 'react'

import styles from '../page.module.scss'
import { Box } from '@/ui/components/Box/Box.component'
import { exists } from '@/functions/exists'
import { getDeletedPostsByAuthorId } from '@/services/Prisma/getDeletedPostsByAuthorId'
import { Container } from '@/components/Container/Container.component'
import { UserProfile } from '@/components/UserProfile/UserProfile.component'
import { Button } from '@/ui/components/Button/Button.component'
import { Posts } from '@/components/Posts/Posts.component'
import { parseUser } from '@/functions/parseUser'
import { redirect } from 'next/navigation'

const Welcome = async (): Promise<ReactElement> => {
	const user = await parseUser()

	if (!user) { redirect('/login') }

	const posts = await getDeletedPostsByAuthorId([exists(user?.data?.id)])

	if (!user.data) return <Container>{user.message}</Container>

	return (
		<div>
			<UserProfile selfProfile user={user.data} postsCount={posts.length} />
			<Box direction="row" alignItems="start" gap={8} className={styles.box}>
				<Button appearance="secondary" icon="person" href="/profile">Профиль</Button>
				<Button appearance="primary" icon="delete" href="/profile/deleted">Удаленные</Button>
				<Button appearance="secondary" icon="star" href="/profile/saved">Избранное</Button>
				<Button appearance="transparent" icon="add_circle" href="/post">Новый пост</Button>
			</Box>
			<Posts restore controls posts={posts} />
		</div>
	)
}

export default Welcome
