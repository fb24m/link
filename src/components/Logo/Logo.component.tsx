import type { ReactNode } from 'react'
import styles from './Logo.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export const Logo = ({ inverted }: { inverted?: boolean }): ReactNode => {
  return (
    <Link prefetch={false} href='/' className={styles.logo}>
      <picture className={styles.icon}>
        <source
          srcSet={inverted ? 'logo-light.svg' : '/logo-dark.svg'}
          media='(prefers-color-scheme: dark)'
        />
        <Image
          width={32}
          height={32}
          src={inverted ? 'logo-dark.svg' : '/logo-light.svg'}
          alt='fb24m Logo'
        />
      </picture>
      <span className={styles.title}>nextlink</span>
    </Link>
  )
}
