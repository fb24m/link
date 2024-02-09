import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.scss'
import { type ReactElement, type ReactNode } from 'react'

import { Header } from '@/components/Header/Header.component'
import { UserSaver } from '@/components/UserSaver/UserSaver.component'
import { Container } from '@/components/Container/Container.component'

const montserrat = Montserrat({ weight: ['300', '400', '500', '600', '700'], display: 'swap', subsets: ['cyrillic', 'latin'] })

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
  console.log('layout render')
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        <main className="main">
          <Container className="main-container">
            {children}
          </Container>
        </main>
        <UserSaver />
      </body>
    </html>
  )
}

export default Layout
