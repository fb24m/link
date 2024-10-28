import { getCurrentAuth } from '@/services/Prisma/user/getCurrentAuth'
import type { ReactElement } from 'react'

const AppsLayout = async ({ children }: { children: ReactElement }): Promise<ReactElement> => {
	const user = await getCurrentAuth()

	return (
		<div>
			{user?.ok ? children : 'Вы должны войти в аккаунт, чтобы использовать приложения!'}
		</div>
	)
}

export default AppsLayout
