'use client'
import { useActionState, useEffect, useState } from 'react'
import styles from './EditorArea.module.css'
import Icon from '@/ui/components/Icon/Icon.component'
import { Button } from '@/ui/components/Button/Button.component'
import { User } from '@prisma/client'
import { askGemini } from './askGemini'
import { users } from '@/shared/api/users'

export const EditorArea = ({
  defaultValue,
  me,
  isGeminiReady,
}: {
  defaultValue?: string
  me: User
  isGeminiReady: boolean
}) => {
  const [text, setText] = useState(defaultValue ?? '')
  const [isLoading, setIsLoading] = useState(false)
  const [generated, setGenerated] = useState(false)

  return (
    <>
      <div className={styles.postEditor}>
        <div className={styles.aiStart}>
          <h3 className={styles.aiTitle}>
            <Icon icon='lightbulb' /> {generated ? 'Gemini создал пост' : 'Начать писать с Gemini'}
          </h3>
          <p className={styles.aiDescription}>
            {generated
              ? 'Gemini создал пост специально для вас. Вы можете отредактировать его и опубликовать, а если идея не нравится совсем - попробовать сгенерировать его еще раз.'
              : 'Gemini проанализирует ваши посты и подскажет идею для нового в похожем стиле, а скоро вы сможете придумывать идеи и улучшать готовые посты с помощью Gemini.'}
          </p>
          {isGeminiReady ? (
            <Button
              type='button'
              appearance='primary'
              loader='spinner'
              isLoading={isLoading}
              onClick={() => {
                setIsLoading(true)

                askGemini()
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
          ) : (
            <Button type='button' appearance='primary' className={styles.tryButton}>
              Настроить
            </Button>
          )}
        </div>
        <textarea
          className={styles.textarea}
          name='content'
          placeholder='Текст поста'
          defaultValue={defaultValue}
          value={text}
          onInput={e => {
            setText((e.target as HTMLInputElement).value)
          }}
        />
      </div>
      <div className={styles.statusbar}>
        <div className={styles.statusbarItem}>Символы {text.length}</div>
        <div className={styles.statusbarItem}>
          Слова: {text.length < 1 ? text.split(' ').length - 1 : text.split(' ').length}
        </div>
        <div className={styles.statusbarItem}>
          Время чтения: {text.length <= 500 ? 'меньше минуты' : Math.floor(text.length / 500) + ' мин.'}
        </div>
      </div>
    </>
  )
}
