import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.scss'
import { type ReactElement, type ReactNode } from 'react'
import { ShortForm } from '@/features/ShortForm/ShortForm'
import { UpdateSubscriptions } from './(in)/UpdateSubscriptions'
import PageTransitionLoader from './Loader'

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
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-dark.svg" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={montserrat.className}>
        <main className="main">
          <PageTransitionLoader />
          {children}
        </main>

        <UpdateSubscriptions />
        <ShortForm />
      </body>
    </html>
  )
}

export default Layout
