'use client'

import type { ReactNode } from 'react'
import styles from './ChangeBioPopup.module.scss'
import Textarea from '@/ui/components/Textarea/Textarea.component'
import { Button } from '@/shared/ui/Button/Button.component'
import { Popup } from '@/ui/components/Popup/Popup.component'
import { PopupWrapper } from '@/ui/components/PopupWrapper/PopupWrapper.component'
import { PopupFooter } from '@/ui/components/PopupFooter/PopupFooter.component'
import { PopupTrigger } from '@/ui/components/PopupTrigger/PopupTrigger.component'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

export interface CustomPopupProps {
  buttonText: string
  currentBio: string | null | undefined
}

const ChangeBioSchema = z.object({ 'new-bio': z.string().max(120, 'Максимальная длина - 120 символов') })
type ChangeBioData = z.infer<typeof ChangeBioSchema>

const ChangeBioPopup = (props: CustomPopupProps): ReactNode => {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(ChangeBioSchema) })

  const send = async (data: ChangeBioData) => {
    await fetch(`${process.env.NEXT_PUBLIC_API}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({ bio: data['new-bio'] }),
    })

    router.refresh()
  }

  return (
    <Popup className={styles.popup}>
      <PopupWrapper>
        <form onSubmit={handleSubmit(send)}>
          <Textarea
            {...register('new-bio')}
            defaultValue={props.currentBio !== null ? props.currentBio : ''}
          ></Textarea>
          {formState.errors['new-bio']?.message}
          <PopupFooter>
            <Button loader="spinner" appearance="primary">
              Сохранить
            </Button>
          </PopupFooter>
        </form>
      </PopupWrapper>
      <PopupTrigger>
        <Button appearance="text" className={styles.changeButton}>
          {props.buttonText}
        </Button>
      </PopupTrigger>
    </Popup>
  )
}

export default ChangeBioPopup
