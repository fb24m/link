'use client'

import { useActionState, useEffect, useState, type ReactNode } from 'react'
import styles from './ChangeAvatarPopup.module.scss'
import { Button } from '@/ui/components/Button/Button.component'
import { Popup } from '@/ui/components/Popup/Popup.component'
import { PopupWrapper } from '@/ui/components/PopupWrapper/PopupWrapper.component'
import { PopupFooter } from '@/ui/components/PopupFooter/PopupFooter.component'
import { PopupTrigger } from '@/ui/components/PopupTrigger/PopupTrigger.component'
import { Eval } from '@/components/Eval/Eval.component'
import { setAvatar } from '@/shared/api/avatar'
import Icon from '@/ui/components/Icon/Icon.component'
import { clsx } from '@/functions/clsx'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import toast from 'react-hot-toast'

export interface CustomPopupProps {
  buttonContent: ReactNode
}

const ChangeAvatarPopup = (props: CustomPopupProps): ReactNode => {
  const [isUploading, setIsUploading] = useState(false)
  const [baseUrl, setBaseUrl] = useState<string | undefined>(undefined)

  const [data, action] = useActionState(setAvatar, '')

  const [isForceClosed, setIsForceClosed] = useState(false)

  useEffect(() => {
    if (data === 'finished') {
      setIsForceClosed(true)
      toast.success('Аватар обновлён!')
    }
  }, [data])

  return (
    <form action={action}>
      <Popup className={styles.popup}>
        <PopupWrapper>
          <Eval>
            <p className={styles.title}>Изменение аватара</p>

            <input
              type='file'
              name='avatar'
              className={styles.input}
              id='new-avatar-input'
              onInput={e => {
                e.preventDefault()

                const avatar = (e.target as HTMLInputElement).files?.[0]

                console.log(avatar)

                if (!avatar) return

                avatar.arrayBuffer().then(arrayBuffer => {
                  const base64 = Buffer.from(arrayBuffer).toString('base64')

                  const dataUrl = `data:${avatar.type};base64,${base64}`

                  setBaseUrl(undefined)
                  setIsUploading(true)
                  setTimeout(() => {
                    setBaseUrl(dataUrl)
                    setIsUploading(false)
                  }, 1500)
                })
              }}
            />

            <label className={styles.buttonWrapper} htmlFor='new-avatar-input'>
              <span className={styles.button}>
                {isUploading ? (
                  <Skeleton width={240} height={240} className={styles.skeleton} />
                ) : (
                  !baseUrl && <Icon icon='photo_camera_front'></Icon>
                )}
                <img src={baseUrl} alt='' className={clsx(styles.preview, baseUrl && styles.active)} />
              </span>
            </label>
          </Eval>
          <PopupFooter>
            <Button loader='spinner' appearance='primary' type='submit'>
              Сохранить
            </Button>
          </PopupFooter>
        </PopupWrapper>
        <PopupTrigger>
          <Button
            className={styles.changeButton}
            type='button'
            onClick={() => isForceClosed && setIsForceClosed(false)}
          >
            {props.buttonContent}
          </Button>
        </PopupTrigger>
      </Popup>
    </form>
  )
}

export default ChangeAvatarPopup
