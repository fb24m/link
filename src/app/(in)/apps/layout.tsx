import { parseUser } from '@/functions/parseUser'
import type { ReactElement } from 'react'

const AppsLayout = async ({ children }: { children: ReactElement }): Promise<ReactElement> => {
	const user = await parseUser(false, 'AppsLayour loaded')

	return (
		<div>
			{user?.ok ? children : 'Вы должны войти в аккаунт, чтобы использовать приложения!'}
		</div>
	)
}

export default AppsLayout
