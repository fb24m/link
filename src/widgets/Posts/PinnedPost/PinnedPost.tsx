import { ActionButton } from '@/components/ActionButton'
import { Markdown } from '@/shared/ui/Markdown'
import { posts } from '@/shared/api/posts'
import { Card } from '@/ui/components/Card/Card.component'
import Icon from '@/ui/components/Icon/Icon.component'
import Link from 'next/link'
import { unpin } from '../unpin.action'
import { PinnedPostProps } from './PinnedPost.props'
import styles from './PinnedPost.module.scss'
import { users } from '@/shared/api/users'
import { Button } from '@/shared/ui/Button/Button.component'

export const PinnedPost = async ({ id, avatar, authorId }: PinnedPostProps) => {
  const [pinnedPost] = await posts.getById(id)
  const { userId } = await users.getId()

  return pinnedPost ? (
    <Card className={styles.pinned}>
      <img className={styles.blurredAvatar} src={avatar} alt="" />
      <div className={styles.pinnedContent}>
        <Link className={styles.pinnedLink} href={`/article/${pinnedPost.id}`}>
          <Icon icon="keep" />
          <Markdown className={styles.pinnedContentTitle}>
            {pinnedPost.content.split('\n')[0].split('<br>')[0]}
          </Markdown>
        </Link>

        <ActionButton action={unpin} icon="keep_off" appearance="primary" />
      </div>
    </Card>
  ) : (
    userId === authorId && (
      <Card className={styles.pinPost}>
        <div className={styles.content}>
          <span>Расскажите о себе при помощи закрепленного поста</span>
          <span className={styles.pinPostSmallText}>эту рекомендацию видите только вы</span>
        </div>
        <Button as="link" appearance="primary" href="/article/190">
          Подробнее
        </Button>
      </Card>
    )
  )
}
