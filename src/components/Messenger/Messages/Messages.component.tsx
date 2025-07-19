'use client'

import type { MessagesProps } from './Messages.props'
import styles from './Messages.module.scss'
import { type ReactElement, useEffect } from 'react'

export const Messages = (props: MessagesProps): ReactElement => {
  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [props.messages])

  return (
    <div className={styles.messages}>
      {props.messages.map((message) => (
        <div
          key={message.content}
          className={`${styles.messageWrapper} ${message.author === props.user?.username ? styles.self : ''}`}
        >
          <div className={styles.message}>
            {message.content}
            <span className={styles.date}>
              {message.date.getHours()}:
              {message.date.getMinutes() <= 9
                ? '0' + message.date.getMinutes()
                : message.date.getMinutes()}
            </span>{' '}
            <br />
          </div>
        </div>
      ))}
    </div>
  )
}
