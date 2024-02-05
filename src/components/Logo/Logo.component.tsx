import type { ReactNode } from 'react'
import styles from './Logo.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export const Logo = (): ReactNode => {
	return (
		<Link prefetch={false} href="/" className={styles.logo}>
			<Image width={32} height={32} className={styles.icon} src="/logo.png" alt="fb24m Logo" />
			<div className={styles.content}>
				<span className={styles.title}>
					NextLink
				</span>
			</div>
		</Link>
	)
}
