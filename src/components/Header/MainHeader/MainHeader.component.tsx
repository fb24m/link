import type { ReactNode } from 'react'
import styles from './MainHeader.module.scss'
import { Container } from '@/components/Container/Container.component'
import { Logo } from '@/components/Logo/Logo.component'
import { Profile } from '../Profile/Profile.component'
import { clsx } from '@/functions/clsx'

export const MainHeader = ({ fullWidth }: { fullWidth?: boolean }): ReactNode => {
	return (
		<div className={styles.header}>
			<Container className={clsx(styles.container, fullWidth ? styles.fullWidth : '')}>
				<div style={{ flexGrow: 1 }}></div>
				<Logo />
				<Profile />
			</Container>
		</div>
	)
}
