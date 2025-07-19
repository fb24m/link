'use client'

import { Box } from '@/ui/components/Box/Box.component'
import styles from './ProfileMenu.module.scss'
import { usePathname } from 'next/navigation'
import { LButton } from '@/shared/ui/LButton/LButton'

export const ProfileMenu = () => {
  const pathname = usePathname()

  const appearance = (enabled: boolean) => (enabled ? 'primary' : 'secondary')

  return (
    <Box direction='row' alignItems='start' gap={8} className={styles.box}>
      <LButton appearance={appearance(pathname === '/profile')} icon='person' href='/profile'>
        Профиль
      </LButton>
      <LButton appearance={appearance(pathname === '/profile/deleted')} icon='delete' href='/profile/deleted'>
        Удаленные
      </LButton>
      <LButton appearance={appearance(pathname === '/profile/saved')} icon='star' href='/profile/saved'>
        Избранное
      </LButton>
      <LButton appearance='transparent' icon='add_circle' href='/editor'>
        Новый пост
      </LButton>
    </Box>
  )
}
