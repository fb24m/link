import { prisma } from '@/services/prisma'
import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'
import { Posts } from '@/widgets/Posts/Posts'
import { PostType } from '@/shared/api/posts'
import { Button } from '@/shared/ui/Button/Button.component'

const CommunityPage = async (props: { params: Promise<{ id: string }> }): Promise<ReactElement> => {
  const params = await props.params
  const community = await prisma.community.findUnique({ where: { id: +params.id } })

  if (!community) notFound()

  const posts = await prisma.post.findMany({ where: { authorId: +params.id } })

  return (
    <div>
      Сообщество: {community?.name}
      <Button as="link" icon="create" appearance="primary" href={`/communities/${params.id}/post`}>
        Новый пост
      </Button>
      <Posts posts={posts as PostType[]} />
    </div>
  )
}

export default CommunityPage
