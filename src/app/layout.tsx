import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.scss'
import { type ReactElement, type ReactNode } from 'react'
import { Header } from '@/components/Header/Header.component'
import { ShortForm } from '@/features/ShortForm/ShortForm'

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
      <body className={montserrat.className}>

        <main className="main">
          {children}
        </main>

        {/* <UserProvider /> */}
        <ShortForm />

      </body>
    </html>
  )
}

export default Layout
