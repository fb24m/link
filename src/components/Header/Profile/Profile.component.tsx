import type { ReactElement } from 'react'
import styles from './Profile.module.scss'
import { Button } from '@/ui/components/Button/Button.component'
import { getCurrentAuth } from '@/services/Prisma/user/getCurrentAuth'

export const Profile = async (): Promise<ReactElement> => {
	const user = await getCurrentAuth()

	console.log(user?.data?.username)

	return (
		<Button appearance="transparent" icon="account_circle" href="/profile" className={styles.profile}>
			{user?.data?.username ?? 'Войти'}
		</Button>
	)
}
