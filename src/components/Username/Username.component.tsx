import { exists } from '@/functions/exists'
import { getUser } from '@/services/Prisma/getUser'
import type { ReactElement } from 'react'
import styles from './Username.module.scss'
import { Button } from '@/ui/components/Button/Button.component'
import Icon from '@/ui/components/Icon/Icon.component'

export const Username = async ({ id, avatar, className }: { id: number, avatar?: boolean, className: string }): Promise<ReactElement> => {
	const user = await getUser({ id })

	return (
		<Button href={`/user/${user.data?.username}`} appearance="transparent" className={className}>
			{avatar && user.data?.avatar
				? <img src={exists(user.data?.avatar)} className={styles.avatar} />
				: ''}
			{!user.data?.avatar ? <Icon icon="account_circle" className={styles.avatar_placeholder} /> : ''}
			{user.data?.username}
		</Button>
	)
}
