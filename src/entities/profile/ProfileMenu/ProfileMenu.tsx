'use client'

import { Box } from '@/ui/components/Box/Box.component'
import { Button } from '@/ui/components/Button/Button.component'
import styles from './ProfileMenu.module.scss'
import { usePathname } from 'next/navigation'

export const ProfileMenu = () => {
	const pathname = usePathname()

	const appearance = (enabled: boolean) => enabled ? 'primary' : 'secondary'

	return (
		<Box direction="row" alignItems="start" gap={8} className={styles.box}>
			<Button appearance={appearance(pathname === '/profile')}
				icon="person" href="/profile">Профиль</Button>
			<Button appearance={appearance(pathname === '/profile/deleted')}
				icon="delete" href="/profile/deleted">Удаленные</Button>
			<Button appearance={appearance(pathname === '/profile/saved')}
				icon="star" href="/profile/saved">Избранное</Button>
			<Button appearance="transparent" icon="add_circle" href="/editor">Новый пост</Button>
		</Box>
	)
}