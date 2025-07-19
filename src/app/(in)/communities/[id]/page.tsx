import { prisma } from '@/services/Prisma.service'
import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'
import { Posts } from '@/widgets/Posts/Posts'
import { LButton } from '@/shared/ui/LButton/LButton'

const CommunityPage = async (props: { params: Promise<{ id: string }> }): Promise<ReactElement> => {
  const params = await props.params
  const community = await prisma.community.findUnique({ where: { id: +params.id } })

  if (!community) notFound()

  const posts = await prisma.post.findMany({ where: { authorId: +params.id } })

  return (
    <div>
      Сообщество: {community?.name}
      <LButton icon='create' appearance='primary' href={`/communities/${params.id}/post`}>
        Новый пост
      </LButton>
      <Posts posts={posts} />
    </div>
  )
}

export default CommunityPage
