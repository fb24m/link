import type { ReactNode } from 'react'
import styles from './Logo.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export const Logo = (): ReactNode => {
	return (
		<Link prefetch={false} href="/" className={styles.logo}>
			<picture className={styles.icon}>
				<source srcSet="/logo-dark.svg" media="(prefers-color-scheme: dark)" />
				<Image width={32} height={32} src="/logo-light.svg" alt="fb24m Logo" />
			</picture>
			<span className={styles.title}>
				nextlink
			</span>
		</Link>
	)
}
