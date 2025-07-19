// components/PageTransitionLoader.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function PageTransitionLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let timeout = setTimeout(() => {})

    const handleStart = () => {
      timeout = setTimeout(() => setLoading(true), 100) // задержка чтобы избежать мигания
    }

    // const handleComplete = () => {
    //   clearTimeout(timeout)
    //   setLoading(false)
    // }

    router.prefetch(pathname) // прелоад текущей страницы

    window.addEventListener('beforeunload', handleStart)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('beforeunload', handleStart)
    }
  }, [pathname])

  useEffect(() => {
    setLoading(false)
  }, [pathname])

  return loading ? (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50'>
      <span className='loader'>Загрузка...</span>
    </div>
  ) : null
}
