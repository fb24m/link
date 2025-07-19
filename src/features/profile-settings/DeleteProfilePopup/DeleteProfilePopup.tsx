'use client'

import { Eval } from '@/components/Eval/Eval.component'
import { Button } from '@/ui/components/Button/Button.component'
import { Popup } from '@/ui/components/Popup/Popup.component'
import { PopupFooter } from '@/ui/components/PopupFooter/PopupFooter.component'
import { PopupTrigger } from '@/ui/components/PopupTrigger/PopupTrigger.component'
import { PopupWrapper } from '@/ui/components/PopupWrapper/PopupWrapper.component'

import styles from './DeleteProfilePopup.module.css'
import { Input } from '@/ui/components/Input/Input'
import { useActionState } from 'react'
import { deleteProfile } from './deleteProfile'

export const DeleteProfilePopup = () => {
  const [messsage, deleteProfileAction] = useActionState(deleteProfile, null)

  return (
    <Popup>
      <form action={deleteProfileAction}>
        <PopupWrapper className={styles.popupWrapper}>
          <Eval>
            <strong>Удаление профиля</strong>
            <ol>
              <li>
                Вы собираетесь безвозвратно удалить ваш профиль на NextLink
              </li>

              <li>
                После подтверждения, вы больше никогда не сможете войти в этот
                профиль
              </li>

              <li>Удаленный профиль не подлежит восстановлению</li>

              <li style={{ userSelect: 'none' }}>
                Чтобы удалить профиль навсегда, напишите в поле ниже:{' '}
                <span
                  style={{ fontWeight: 500, fontStyle: 'italic', color: 'red' }}
                >
                  Я подтверждаю, что хочу удалить свой профиль
                </span>{' '}
                и нажмите кнопку &quot;Удалить профиль&quot;
              </li>

              <Input
                autoComplete='off'
                name='test-phrase'
                className={styles.input}
              />

              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  name='agree-deletion'
                  id='agree-delete-profile'
                />
                <label htmlFor='agree-delete-profile'>
                  Я понимаю, что больше никогда не смогу войти в свой профиль
                  NextLink и восстановить его
                </label>
              </div>

              <p className={styles.error}>{messsage}</p>
            </ol>
          </Eval>
          <PopupFooter>
            <Button className={styles.deleteButton} appearance='primary'>
              Удалить профиль
            </Button>
          </PopupFooter>
        </PopupWrapper>
      </form>
      <PopupTrigger>
        <Button appearance='primary' className={styles.changeButton}>
          Удалить профиль
        </Button>
      </PopupTrigger>
    </Popup>
  )
}
