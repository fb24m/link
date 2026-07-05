import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { type ReactElement, type ReactNode } from 'react'
import { ShortForm } from '@/features/ShortForm/ShortForm'
import { UpdateSubscriptions } from './(in)/UpdateSubscriptions'
import PageTransitionLoader from './Loader'
import { Toaster } from 'react-hot-toast'
import { QueryProvider } from '@/pages/providers/QueryProvider'

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  subsets: ['cyrillic', 'latin'],
})

export const metadata: Metadata = {
  title: 'NextLink',
  description: 'NextLink - здесь есть только лучшие люди',
  openGraph: { title: 'NextLink', description: 'NextLink - здесь есть только лучшие люди', images: ['/logo.png'] },
}

const Layout = async ({ children }: { children: ReactNode }): Promise<ReactElement> => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-dark.svg" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={montserrat.className}>
        <QueryProvider>
          <main className="main grow flex flex-col">
            <Toaster
              toastOptions={{
                position: 'bottom-center',
                style: {
                  background: 'var(--background-opaque)',
                  backdropFilter: 'blur(10px)',
                  color: 'var(--foreground-color)',
                  border: '2px solid var(--border-opaque)',
                  borderTopWidth: '0px',
                  borderBottomWidth: '0px',
                  borderRadius: '24px',
                },
              }}
            />
            <PageTransitionLoader />
            {children}
          </main>

          <UpdateSubscriptions />
          <ShortForm />
        </QueryProvider>
      </body>
    </html>
  )
}

export default Layout
