import { Editor } from '@/components/Editor/Editor.component'
import { prisma } from '@/services/Prisma.service'
import { users } from '@/shared/api/users'
import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'

const CommunitiesPost = async (props: { params: Promise<{ id: string }> }): Promise<ReactElement> => {
  const params = await props.params;
  const community = await prisma.community.findUnique({ where: { id: +params.id } })
  const user = await users.getMe()

  if (community?.ownerId !== user?.id) notFound()

  return (
    <Editor publishDate={new Date()} user={community as any} new />
  )
}

export default CommunitiesPost
