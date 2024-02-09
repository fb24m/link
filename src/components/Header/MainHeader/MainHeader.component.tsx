import type { ReactNode } from 'react'
import styles from './MainHeader.module.scss'
import { Container } from '@/components/Container/Container.component'
import { Logo } from '@/components/Logo/Logo.component'
import { Profile } from '../Profile/Profile.component'

export const MainHeader = (): ReactNode => {
	return (
		<div className={styles.header}>
			<Container className={styles.container}>
				<Logo />
				<Profile />
			</Container>
		</div>
	)
}
