import { Sidebar } from '@/components/Sidebar/Sidebar.component'
import type { Metadata } from 'next'
// import './globals.scss'
import { type ReactElement, type ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'NextLink',
	description: 'NextLink - здесь есть только лучшие люди',
	openGraph: {
		title: 'NextLink',
		description: 'NextLink - здесь есть только лучшие люди',
		images: ['/logo.png']
	}
}

const Layout = async ({ children }: { children: ReactNode }): Promise<ReactElement> => {
	return (
		<>
			<Sidebar></Sidebar>
			{children}
		</>
	)
}

export default Layout
