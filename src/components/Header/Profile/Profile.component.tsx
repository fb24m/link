import type { ReactElement } from 'react'
import styles from './Profile.module.scss'
import { Button } from '@/ui/components/Button/Button.component'
import { parseUser } from '@/functions/parseUser'

export const Profile = async (): Promise<ReactElement> => {
	const user = await parseUser(false)

	return (
		<Button appearance="transparent" icon="account_circle" href="/profile" className={styles.profile}>
			{user?.data?.username ? user?.data?.username : 'Войти'}
		</Button>
	)
}
