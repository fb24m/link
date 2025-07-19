'use client'

import type { ReactNode } from 'react'
import styles from './not-found.module.scss'
import { Button } from '@/ui/components/Button/Button.component'
import { LButton } from '@/shared/ui/LButton/LButton'

const NotFound = (): ReactNode => {
  return (
    <div className={styles.notFound}>
      <div className={styles.wrapper}>
        <div className={styles.error}>
          <span className={styles.code}>404</span>
          <div className={styles.errorBody}>
            <p className={styles.errorText}>Эта страница не&nbsp;существует</p>
            <div className={styles.buttons}>
              <LButton href='/' appearance='primary' icon='home'>
                На главную
              </LButton>
              <LButton href='/profile' appearance='secondary' icon='person'>
                Профиль
              </LButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
