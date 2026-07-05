import type { ReactElement } from 'react'
import styles from './Posts.module.scss'

import { Post } from '../../features/Post/Post.component'
import { Card } from '@/ui/components/Card/Card.component'
import { users } from '@/shared/api/users'
import { prisma } from '@/services/prisma'
import { Box } from '@/ui/components/Box/Box.component'
import { clsx } from 'clsx'
import { PinnedPost } from './PinnedPost/PinnedPost'
import { User } from '../../../generated/prisma/client'
import { PostType } from '@/shared/api/posts'
import { Button } from '@/shared/ui/Button/Button.component'

export interface PostsProps {
  posts: PostType[]
  controls?: boolean
  restore?: boolean
  author?: User
  whoMentioned?: string
}

export const Posts = async ({
  author,
  posts: Posts,
  controls,
  restore,
  whoMentioned,
}: PostsProps): Promise<ReactElement> => {
  const { username } = await users.getId()

  const pinnedPostId = author?.pinned

  let getAuthor

  getAuthor = () => author

  if (!author) {
    const authors = await prisma.user.findMany({
      where: { id: { in: Array.from(new Set(Posts.map(p => p.authorId ?? 0))) } },
    })

    getAuthor = (id: number) => author ?? authors.filter(a => a.id === id)[0]
  }

  return (
    <div className={styles.posts}>
      {!!pinnedPostId && (
        <PinnedPost id={pinnedPostId ?? 0} authorId={author?.id} avatar={author?.avatar ?? undefined} />
      )}

      {(author || whoMentioned) && (
        <Box gap={8} direction="row" alignItems="center">
          <Button
            as="link"
            href={username === whoMentioned ? '/profile' : `/user/${author?.username ?? whoMentioned}`}
            appearance={!whoMentioned ? 'primary' : 'secondary'}
          >
            Посты автора
          </Button>
          <Button
            as="link"
            href={`/user/${author?.username ?? whoMentioned}/mentioned`}
            appearance={whoMentioned ? 'primary' : 'secondary'}
          >
            Посты с упоминанием
          </Button>
          <span className={clsx(styles.new, whoMentioned && styles.primary)}>Новое</span>
        </Box>
      )}

      {Posts &&
        Posts?.map(post => (
          <Post
            key={post.id}
            restore={restore}
            controls={controls}
            author={getAuthor(post.authorId ?? 0)}
            post={post}
          />
        )).reverse()}

      <Card className={styles.end}>
        <h2 className={styles.title}>{Posts.length !== 0 ? 'Вы дошли до конца' : 'Тут пока нет постов'}</h2>
        <p className={styles.description}>
          {Posts.length !== 0
            ? 'Вы можете вернуться в ленту, чтобы прочитать новые посты или найти новых пользователей'
            : 'Начните писать сами или подпишитесь на кого-нибудь из пользователей, чтобы читать его посты в ленте'}
        </p>
        <Button as="link" className={styles.homeButton} href="/" appearance="primary">
          На главную
        </Button>
      </Card>
    </div>
  )
}
