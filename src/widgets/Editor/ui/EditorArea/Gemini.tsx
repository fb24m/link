'use client'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import styles from './EditorArea.module.css'
import Icon from '@/ui/components/Icon/Icon.component'
import { Button } from '@/shared/ui/Button/Button.component'
import { askGemini } from './askGemini'
import Link from 'next/link'
import { Input } from '@/shared/ui/Input/Input'

export const Gemini = ({
  isGeminiReady,
  text,
  setText,
}: {
  isGeminiReady: boolean
  text: string
  setText: Dispatch<SetStateAction<string>>
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const prompt = useRef<HTMLInputElement>(null)

  return (
    <>
      <div className={styles.aiStart}>
        <h3 className={styles.aiTitle}>
          <Icon icon="lightbulb" />{' '}
          {generated
            ? 'Gemini создал пост'
            : text != ''
              ? 'Редактировать пост с помощью Gemini'
              : 'Начать писать с Gemini'}
        </h3>
        <p className={styles.aiDescription}>
          {generated
            ? 'Gemini создал пост специально для вас. Вы можете написать, что хотели бы изменить, ниже, и Gemini исправит это.'
            : text != ''
              ? 'Вы написали текст поста. Теперь вы можете редактировать его с помощью Gemini.'
              : 'Gemini проанализирует ваши посты и подскажет идею для нового в похожем стиле, а скоро вы сможете придумывать идеи и улучшать готовые посты с помощью Gemini.'}
        </p>
        {isGeminiReady ? (
          <div className={styles.promptArea}>
            <p>{generated || text ? 'Введите, что вы хотели бы изменить:' : 'Введите промпт:'}</p>

            <div className={styles.prompt}>
              <Input
                ref={prompt}
                appearance="rounded"
                className={styles.input}
                placeholder={generated || text ? 'Введите запрос' : 'Поле можно оставить пустым'}
              />
              <Button
                type="button"
                appearance="primary"
                loader="spinner"
                isLoading={isLoading}
                onClick={() => {
                  const value: string | undefined = prompt.current?.value
                  if (prompt.current) {
                    prompt.current.value = ''
                  }
                  setIsLoading(true)

                  askGemini(value)
                    .then(response => {
                      console.log(response)
                      setText(response)
                      setIsLoading(false)
                      setGenerated(true)
                    })
                    .finally(() => {
                      setIsLoading(false)
                    })
                }}
                className={styles.tryButton}
              >
                Сгенерировать пост
              </Button>
            </div>
          </div>
        ) : (
          <Link href="/profile/settings/gemini">
            <Button type="button" appearance="primary" className={styles.tryButton}>
              Настроить
            </Button>
          </Link>
        )}
      </div>
    </>
  )
}
