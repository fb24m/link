'use client'

import { Button } from '@/ui/components/Button/Button.component'
import { Card } from '@/ui/components/Card/Card.component'
import { Input } from '@/ui/components/Input/Input'
import styles from './UpdateGemini.module.scss'
import { saveGeminiKey } from '@/app/(in)/profile/settings/gemini/saveApiKey'
import { useActionState } from 'react'
import Link from 'next/link'

export const UpdateGemini = ({ keyExists }: { keyExists: boolean }) => {
  const [state, action] = useActionState(saveGeminiKey, '')

  return (
    <form action={action}>
      <Card className={styles.geminiSettingsCard}>
        <h2 className={styles.title2}>API ключ</h2>
        <p className={styles.description}>
          Для работы Gemini необходим API-ключ из Google AI Studio. Создать его можно бесплатно{' '}
          <Link href='https://aistudio.google.com/api-keys' target='_blank'>
            <Button type='button' appearance='transparent'>
              по ссылке
            </Button>
          </Link>
        </p>
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
