import type { ReactElement } from 'react'
import type { PostProps } from './Post.props'
import { Link } from '@/shared/ui/Link/Link'
import { movePostToDeleted } from '@/actions/movePostToDeleted.action'

import { restorePost } from '@/actions/restorePost'

import { Box } from '@/ui/components/Box/Box.component'
import { Markdown } from '@/components/Markdown/Markdown.component'
import { ActionButton } from '@/components/ActionButton/ActionButton.component'
import { Card } from '@/ui/components/Card/Card.component'
import { CopyButton } from '@/components/CopyButton/CopyButton.component'
import { DateFormat } from '@/entities/Date/Date'

import { prisma } from '@/services/Prisma.service'

import styles from './Post.module.scss'
import { ReadMore } from '@/features/Post/ReadMore'
import { users } from '@/shared/api/users'
import { pin } from '../../widgets/Posts/pin.action'
import { LButton } from '@/shared/ui/LButton/LButton'
import { Share } from '../Share/Share'

const maxContentLength = 500

function stringToNumber255(input: string): number {
  let sum = 0
  for (let i = 0; i < input.length; i++) {
    sum += input.charCodeAt(i)
  }
  return sum % 255 || 1
}

export const Post = async ({ full, post, restore, controls, ...props }: PostProps): Promise<ReactElement> => {
  const { id, authorId, content: rawContent, publishDate } = post

  if (!authorId) return <></>

  const author = props.author ?? (await users.get(authorId))

  let content = rawContent.split('<br>').join('\n')
  const comments = await prisma.comment.findMany({ where: { postId: id } })

  if (content.match(/(<script|<style|<head|style=)/g)) return <hr style={{ borderColor: 'var(--medium-color)' }} />

  const isIncomplete = content.length > maxContentLength && !full

  if (isIncomplete) content = content.substring(0, maxContentLength) + '...'

  return (
    <Card mobileShrink className={styles.post} id={`post-${id}`}>
      <div className={styles.author}>
        <img
          src={author?.avatar ?? undefined}
          alt={author?.username[0].toUpperCase()}
          className={styles.avatar}
          style={{
            ...(!author?.avatar && { backgroundColor: `hsl(${stringToNumber255(author?.username)}, 100%, 50%)` }),
          }}
        />
        <div className={styles.userdata}>
          <Link href={`/user/${author?.username}`} className={styles.name}>
            {author?.username}
          </Link>
          <span className={styles.date}>
            <DateFormat format={!full ? 'relative' : undefined} date={new Date(publishDate ?? '')} />
          </span>
        </div>
        {controls && (
          <div className={styles.actions}>
            <LButton appearance='transparent' icon='edit' href={`/editor/${id}`}></LButton>
            <ActionButton appearance='transparent' icon='keep' fields={[{ name: 'id', value: id }]} action={pin} />
            {restore ? (
              <ActionButton
                appearance='primary'
                icon='restore_from_trash'
                fields={[
                  { name: 'post-id', value: id },
                  { name: 'author-id', value: id },
                ]}
                action={restorePost}
              />
            ) : (
              <ActionButton
                appearance='transparent'
                icon='delete'
                fields={[{ name: 'post-id', value: id }]}
                action={movePostToDeleted}
              />
            )}
          </div>
        )}
      </div>

      <Markdown>{content}</Markdown>

      <ReadMore className={styles.readMore} show={isIncomplete} postId={id}>
        Читать далее
      </ReadMore>

      <div className={styles.interaction}>
        <Box gap={8} direction='row' className={styles.interactionButtons}>
          <LButton
            className={styles.interactionButton}
            icon='favorite'
            appearance='secondary'
            href={`/article/${id}#comments`}
          ></LButton>
          {!full && (
            <LButton
              className={styles.interactionButton}
              icon='chat'
              appearance='secondary'
              href={`/article/${id}#comments`}
            >
              Комментарии ({comments.length})
            </LButton>
          )}
          <Share link={`https://link.fb24m.ru/article/${id}`} text={`Пост ${author.username} на NextLink`} />
          <CopyButton
            className={styles.interactionButton}
            success='Ссылка скопирована'
            text={`https://link.fb24m.ru/article/${id}`}
            icon='share'
            appearance='secondary'
          >
            Поделиться
          </CopyButton>
        </Box>
      </div>
    </Card>
  )
}
