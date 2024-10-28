import { Editor } from '@/components/Editor/Editor.component'
import { prisma } from '@/services/Prisma.service'
import { getCurrentAuth } from '@/services/Prisma/user/getCurrentAuth'
import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'

const CommunitiesPost = async (props: { params: Promise<{ id: string }> }): Promise<ReactElement> => {
  const params = await props.params;
  const community = await prisma.community.findUnique({ where: { id: +params.id } })
  const user = await getCurrentAuth()

  if (community?.ownerId !== user?.data?.id) notFound()

  return (
    <Editor publishDate={new Date()} user={community as any} new />
  )
}

export default CommunitiesPost
