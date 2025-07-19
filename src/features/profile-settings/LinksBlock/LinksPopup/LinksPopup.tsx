'use client'

import { Button } from '@/ui/components/Button/Button.component'
import { Popup } from '@/ui/components/Popup/Popup.component'
import { PopupFooter } from '@/ui/components/PopupFooter/PopupFooter.component'
import { PopupTrigger } from '@/ui/components/PopupTrigger/PopupTrigger.component'
import { PopupWrapper } from '@/ui/components/PopupWrapper/PopupWrapper.component'

import styles from './LinksPopup.module.css'
import Icon from '@/ui/components/Icon/Icon.component'
import { useActionState } from 'react'
import { updateLinks } from './updateLinks'

export const LinksPopup = ({ userLinks }: { userLinks: { icon: string; link: string }[] }) => {
  const allLinks: Record<string, string> = {
    telegram: 't.me/',
    github: 'github.com/user/',
    youtube: 'www.youtube.com/',
    steam: 'steamcomminity.com/user/id/',
    namemc: 'namemc.org/',
    xbox: 'xbox.com/play/user/',
    tiktok: 'tiktok.com/',
    linkedin: 'www.linkedin.com/',
    instagram: 'www.instagram.com/',
    facebook: 'www.facebook.com/',
    x: 'x.com/',
  }

  const [, action] = useActionState(updateLinks, null)

  return (
    <Popup>
      <form action={action}>
        <PopupWrapper>
          <h2 className={styles.title}>Ссылки</h2>

          <div className={styles.links}>
            {Object.keys(allLinks).map(link => {
              const thisUserLink = userLinks.filter(item => item.icon === link)[0]?.link.toString() ?? ''
              const thisLinkUsername = thisUserLink.split('/')[thisUserLink.split('/').length - 1]

              return (
                <div className={styles.linkTag} key={JSON.stringify(link)}>
                  <label htmlFor={link}>{allLinks[link]}</label>
                  <input className={styles.input} name={link} id={link} defaultValue={thisLinkUsername} />
                  {thisLinkUsername && <Icon icon='check' />}
                </div>
              )
            })}
          </div>

          <p className={styles.label}>Preview version. May not work and is subject to change</p>

          <PopupFooter>
            <Button loader='spinner' type='submit' appearance='primary'>
              Сохранить
            </Button>
          </PopupFooter>
        </PopupWrapper>
      </form>
      <PopupTrigger>
        <Button appearance='primary'>Изменить ссылки</Button>
      </PopupTrigger>
    </Popup>
  )
}
