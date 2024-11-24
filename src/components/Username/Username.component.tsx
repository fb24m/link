import type { ReactElement } from 'react'
import styles from './Username.module.scss'
import { Button } from '@/ui/components/Button/Button.component'
import Icon from '@/ui/components/Icon/Icon.component'
import { getUser } from '@/services/Prisma/user/get'

export const Username = async ({ id, avatar, className }: { id: number, avatar?: boolean, className: string }): Promise<ReactElement> => {
	const user = await getUser(id)

	return (
		<Button href={`/user/${user?.username}`} appearance="transparent" className={className}>
			{avatar && user?.avatar
				? <img src={user?.avatar} className={styles.avatar} />
				: ''}
			{!user?.avatar ? <Icon icon="account_circle" className={styles.avatar_placeholder} /> : ''}
			{user?.username}
		</Button>
	)
}
