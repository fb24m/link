import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.scss'
import { Suspense, type ReactNode } from 'react'

const montserrat = Montserrat({ preload: false, weight: ['300', '400', '500', '600', '700'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

const Layout = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Suspense fallback={<>fdss</>}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}

export default Layout
