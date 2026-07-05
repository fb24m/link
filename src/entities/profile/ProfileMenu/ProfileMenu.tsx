'use client'

import { Box } from '@/ui/components/Box/Box.component'
import styles from './ProfileMenu.module.scss'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { Button } from '@/shared/ui/Button/Button.component'
import { twMerge } from 'tailwind-merge'

export const ProfileMenu = () => {
  const pathname = usePathname()

  const appearance = (enabled: boolean) => (enabled ? 'primary' : 'tonal')

  /*
  .box {
    margin-bottom: 16px;
  }

  .button {
    @media(max-width: 640px) {
      font-size: 0;
    }

    &.active {
      @media (max-width: 640px) {
        font-size: 14px;
      }
    }
  }

  .hideMobile {
    @media (max-width: 640px) {
      display: none;
    }
  }
  */

  return (
    <Box direction="row" alignItems="start" gap={8} className="mb-4">
      <Button
        as="link"
        className={twMerge(styles.button, pathname === '/profile' && styles.active)}
        appearance={appearance(pathname === '/profile')}
        icon="person"
        href="/profile"
      >
        Профиль
      </Button>
      <Button
        as="link"
        className={clsx(styles.button, pathname === '/profile/deleted' && styles.active)}
        appearance={appearance(pathname === '/profile/deleted')}
        icon="delete"
        href="/profile/deleted"
      >
        Удаленные
      </Button>
      <Button
        as="link"
        className={clsx(styles.button, pathname === '/profile/saved' && styles.active)}
        appearance={appearance(pathname === '/profile/saved')}
        icon="star"
        href="/profile/saved"
      >
        Избранное
      </Button>
      <Button as="link" className={styles.hideMobile} appearance="elevated" icon="add_circle" href="/editor">
        Новый пост
      </Button>
    </Box>
  )
}
