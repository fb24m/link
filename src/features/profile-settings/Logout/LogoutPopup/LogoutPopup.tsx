'use client'

import { Button } from '@/ui/components/Button/Button.component'
import { Popup } from '@/ui/components/Popup/Popup.component'
import { PopupFooter } from '@/ui/components/PopupFooter/PopupFooter.component'
import { PopupTrigger } from '@/ui/components/PopupTrigger/PopupTrigger.component'
import { PopupWrapper } from '@/ui/components/PopupWrapper/PopupWrapper.component'

import styles from './LogoutPopup.module.css'
import { logout } from '../logout'

export const LogoutPopup = () => {
  return (
    <Popup>
      <PopupWrapper>
        <h2 className={styles.title}>Выход</h2>
        <p className={styles.paragraph}>
          Подтвердите выход из аккаунта NextLink
        </p>
        <PopupFooter>
          <Button
            appearance='primary'
            onClick={() => {
              logout()
            }}
          >
            Выйти
          </Button>
        </PopupFooter>
      </PopupWrapper>
      <PopupTrigger>
        <Button appearance='primary'>Выйти</Button>
      </PopupTrigger>
    </Popup>
  )
}
