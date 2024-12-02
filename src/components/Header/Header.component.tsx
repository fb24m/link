// 'use client'

import { type ReactNode } from 'react'
import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '../Container/Container.component'
import { MainHeader } from './MainHeader/MainHeader.component'

export const Header = (): ReactNode => {
	return (
		<>
			<div className={styles.subheader}>
				<Container className={styles.container}>
					<Link className={styles.fb24m} href="https://web.fb24m.ru?utm_source=next-link">
						<Image width={36} height={32} className={styles.logo} src="/fb24m_logo.svg" alt="fb24m Logo" />
						fb24m | Pet
					</Link>
				</Container>
			</div>
			<MainHeader />
		</>
	)
}
