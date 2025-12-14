'use client'

import { Button } from '@/ui/components/Button/Button.component'
import { Card } from '@/ui/components/Card/Card.component'
import { Input } from '@/ui/components/Input/Input'
import styles from './UpdateGemini.module.scss'
import { saveGeminiKey } from '@/app/(in)/profile/settings/gemini/saveApiKey'
import { useActionState } from 'react'

export const UpdateGemini = ({ keyExists }: { keyExists: boolean }) => {
  const [state, action] = useActionState(saveGeminiKey, '')

  return (
    <form action={action}>
      <Card className={styles.geminiSettingsCard}>
        <h2 className={styles.title2}>API ключ</h2>
        {keyExists ? (
          <div className={styles.input}>Вы уже указали API ключ</div>
        ) : (
          <Input name='key' className={styles.input} placeholder='XjxrIyZUdLUSgfJKQ-iOlUQpyYgJKmTfDsCwYuiJT' />
        )}
        <Button loader='spinner' appearance='primary'>
          Сохранить
        </Button>

        <p>{state}</p>
      </Card>
    </form>
  )
}
