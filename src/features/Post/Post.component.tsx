import { memo, ReactNode, useMemo, type ReactElement } from 'react'
import type { PostProps } from './Post.props'
import { Link } from '@/shared/ui/Link/Link'

import { Box } from '@/ui/components/Box/Box.component'
import { ActionButton } from '@/components/ActionButton'
import { Card } from '@/ui/components/Card/Card.component'
import { CopyButton } from '@/components/CopyButton'
import { DateFormat } from '@/entities/Date/Date'

import styles from './Post.module.scss'
import { ReadMore } from '@/features/Post/ReadMore'
import { users } from '@/shared/api/users'
import { pin } from '../../widgets/Posts/pin.action'
import { Share } from '../Share/Share'
import { Button } from '@/shared/ui/Button/Button.component'
import { TrashButton } from './TrashButton'
import { Post as PostType, User } from '../../../generated/prisma/client'
import StarterKit from '@tiptap/starter-kit'
import { renderToReactElement } from '@tiptap/static-renderer'
import { Eval } from '@/shared/ui/Eval/Eval'
import { twMerge } from 'tailwind-merge'

const maxContentLength = 500

function stringToNumber255(input: string): number {
  let sum = 0
  for (let i = 0; i < input.length; i++) {
    sum += input.charCodeAt(i)
  }
  return sum % 255 || 1
}

const Author = memo(({ author, full, publishDate }: { author: User; full: boolean; publishDate: Date }) => {
  return (
    <>
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
          <DateFormat format={!full ? 'relative' : undefined} date={new Date(publishDate)} />
        </span>
      </div>
    </>
  )
})

Author.displayName = 'Author'

const getPostData = async (
  post: PostType,
  author?: User
): Promise<{ author?: User; content: ReactNode | null } & Omit<PostType, 'content'>> => {
  let resultContent: string | null = null

  try {
    JSON.parse(post.content)
    resultContent = post.content
  } catch {
    resultContent = null
  }

  let output: ReactNode

  if (resultContent) {
    output = useMemo(() => renderToReactElement({ extensions: [StarterKit], content: JSON.parse(resultContent) }), [])
  }

  return { ...post, author: author ?? (await users.get(post.authorId ?? 0)) ?? null, content: output ?? null }
}

export const Post = async ({ full, post, restore, controls, ...props }: PostProps): Promise<ReactElement> => {
  const { id, author, content, publishDate } = await getPostData(post, props.author)

  if (!author || !content) return <></>

  return (
    <Card mobileShrink className={styles.post} id={`post-${id}`}>
      <div className={styles.author}>
        <Author author={author} full={!!full} publishDate={publishDate ?? new Date()} />
        {controls && (
          <div className="flex gap-1 justify-end grow">
            <Button size="sm" as="link" appearance="outlined" icon="edit" href={`/editor/${id}`}></Button>
            <ActionButton
              size="sm"
              appearance="outlined"
              icon="keep"
              fields={[{ name: 'id', value: id }]}
              action={pin}
            />
            <TrashButton id={post.id} restore={!!restore} />
          </div>
        )}
      </div>

      <Eval className={twMerge(!full && 'max-h-60 overflow-hidden')}>{content}</Eval>

      <ReadMore className={styles.readMore} show={!full} postId={id}>
        Читать далее
      </ReadMore>

      <div className={styles.interaction}>
        <Box gap={8} direction="row" className={styles.interactionButtons}>
          <Button
            as="link"
            className={styles.interactionButton}
            icon="favorite"
            appearance="tonal"
            href={`/article/${id}#comments`}
          ></Button>
          {!full && (
            <Button
              as="link"
              className={styles.interactionButton}
              icon="chat"
              appearance="tonal"
              href={`/article/${id}#comments`}
            >
              Комментарии
              {/*({post._count.comments})*/}
            </Button>
          )}
          <Share link={`https://link.fb24m.ru/article/${id}`} text={`Пост ${author.username} на NextLink`} />
        </Box>
      </div>
    </Card>
  )
}
