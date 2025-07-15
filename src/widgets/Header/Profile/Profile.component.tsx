import type { ReactElement } from 'react'
import styles from './Profile.module.css'
import { Button } from '@/ui/components/Button/Button.component'
import { users } from '@/shared/api/users'

export const Profile = async (): Promise<ReactElement> => {
	const user = await users.getMe()

	return (
		<Button appearance="transparent" icon="account_circle" href="/profile" className={styles.profile}>
			{user?.username ?? 'Войти'}
		</Button>
	)
}
