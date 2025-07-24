'use client'

import { Button } from '@/ui/components/Button/Button.component'
import { Card } from '@/ui/components/Card/Card.component'
import styles from './ShortForm.module.css'
import { useEffect, useState } from 'react'
import { getShortFormState } from './getFormState'
import { closeForm } from './closeForm'
import { LButton } from '@/shared/ui/LButton/LButton'

export const ShortForm = () => {
  const [isFormOpened, setIsFormOpened] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      setIsFormOpened((await getShortFormState()) !== 'closed')
    })()
  }, [])

  return (
    <>
      {isFormOpened && (
        <div className={styles.formWrapper}>
          <Card className={styles.shortForm}>
            Пройдите короткий опрос о вашем впечатлении о NextLink. Это займет несколько минут
            <div className={styles.buttons}>
              <Button
                className={styles.button}
                appearance='secondary'
                onClick={() => {
                  closeForm()
                  setIsFormOpened(false)
                }}
              >
                Закрыть
              </Button>
              <LButton
                className={styles.button}
                appearance='primary'
                href='https://forms.gle/GGejHRTZ3svqgWwu8'
                target='_blank'
              >
                Пройти опрос
              </LButton>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
