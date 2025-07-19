// 'use client'

import { type ReactNode } from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/Container/Container.component'
import { Logo } from '@/components/Logo/Logo.component'
import { Profile } from './Profile/Profile.component'

export const Header = (): ReactNode => {
  return (
    <header>
      <div className={styles.subheader}>
        <Container className={styles.container}>
          <Link
            className={styles.fb24m}
            href='https://web.fb24m.ru?utm_source=next-link'
          >
            <Image
              width={36}
              height={32}
              className={styles.logo}
              src='/fb24m_logo.svg'
              alt='fb24m Logo'
            />
            fb24m | Pet
          </Link>
        </Container>
      </div>
      <div className={styles.header}>
        <Container className={styles.container}>
          <div style={{ flexGrow: 1 }}></div>
          <Logo />
          <Profile />
        </Container>
      </div>
    </header>
  )
}
