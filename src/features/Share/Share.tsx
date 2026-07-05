'use client'

import { Button } from '@/shared/ui/Button/Button.component'
import { Popup } from '@/ui/components/Popup/Popup.component'
import { PopupFooter } from '@/ui/components/PopupFooter/PopupFooter.component'
import { PopupTrigger } from '@/ui/components/PopupTrigger/PopupTrigger.component'
import { PopupWrapper } from '@/ui/components/PopupWrapper/PopupWrapper.component'
import styles from './Share.module.scss'
import Image from 'next/image'
import { PopupWindow } from '@/ui/components/PopupWindow/PopupWindow'
import toast from 'react-hot-toast'
import Icon from '@/ui/components/Icon/Icon.component'
import { Ripple } from 'm3-ripple'

export const Share = ({ link, text, outlined }: { link: string; text?: string; outlined?: boolean }) => {
  return (
    <Popup>
      <PopupWrapper>
        <PopupWindow className={styles.body}>
          <h2 className="text-center text-2xl font-medium mb-6">Поделиться</h2>

          <ul className={styles.shareList}>
            <li>
              <a
                className={styles.shareItem}
                href={`https://t.me/share/url?url=${link}${text ? `&text=${text}` : ''}`}
                target="_blank"
                rel="noreferrer"
              >
                <Ripple />
                <Image src="/social/telegram.svg" alt="" width={40} height={40} />
              </a>
            </li>
            <li>
              <a
                className={styles.shareItem}
                href={`https://vk.com/share.php?url=${link}${text ? `&text=${text}` : ''}`}
                target="_blank"
                rel="noreferrer"
              >
                <Ripple />
                <Image src="/social/vk.svg" alt="" width={40} height={40} />
              </a>
            </li>
            <li>
              <a
                className={styles.shareItem}
                href={`https://twitter.com/intent/tweet?url=${link}${text ? `&text=${text}` : ''}`}
                target="_blank"
                rel="noreferrer"
              >
                <Ripple />
                <Image src="/social/x.svg" alt="" width={40} height={40} />
              </a>
            </li>
            <li>
              <button
                className={styles.shareItem}
                onClick={() => {
                  navigator.clipboard.writeText(link).then(() => {
                    toast.success('Ссылка скопирована')
                  })
                }}
              >
                <Ripple />
                <Icon icon="content_copy" />
              </button>
            </li>
          </ul>
        </PopupWindow>
        <PopupFooter></PopupFooter>
      </PopupWrapper>
      <PopupTrigger onClick={openPopup => (navigator.share ? navigator.share({ url: link }) : openPopup())}>
        <Button appearance={outlined ? 'outlined' : 'tonal'} icon="share" className={styles.button}>
          Поделиться
        </Button>
      </PopupTrigger>
    </Popup>
  )
}
