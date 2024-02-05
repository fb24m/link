import type { ReactNode } from 'react'
import styles from './Logo.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'

export const Logo = (): ReactNode => {
	return (
		<Link prefetch={false} href="/" className={styles.logo}>
			<Image width={32} height={32} className={styles.icon} src="/logo.png" alt="fb24m Logo" />
			<div className={styles.content}>
				<span className={styles.title}>
					NextLink
				</span>
				{process.env.IS_TEST_ENVIROMENT === '1' ? <span className={styles.subtitle}>
					Test Enviroment, 0.3.0-beta.18
				</span> : ''}
			</div>
		</Link>
	)
}
