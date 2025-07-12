import { Container } from '@/components/Container/Container.component'
import { Sidebar } from '@/features/Sidebar/Sidebar.component'
import type { Metadata } from 'next'
import { type ReactElement, type ReactNode } from 'react'
import styles from './layout.module.scss'
import { Header } from '@/components/Header/Header.component'

export const metadata: Metadata = {
	title: 'NextLink',
	description: 'NextLink - здесь есть только лучшие люди',
	openGraph: {
		title: 'NextLink',
		description: 'NextLink - здесь есть только лучшие люди',
		images: ['/logo.png']
	}
}

const Layout = async ({ children }: { children: ReactNode }): Promise<ReactElement> => (
	<>
		<Header />
		<Container className={styles.inContainer}>
			<Sidebar />
			<div data-main className={styles.main}>
				{children}
			</div>
		</Container>
	</>
)

export default Layout
