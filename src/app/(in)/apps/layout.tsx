import { users } from '@/shared/api/users'
import type { ReactElement } from 'react'

const AppsLayout = async ({ children }: { children: ReactElement }): Promise<ReactElement> => {
	const user = await users.getMe()

	return (
		<div>
			{user?.ok ? children : 'Вы должны войти в аккаунт, чтобы использовать приложения!'}
		</div>
	)
}

export default AppsLayout
