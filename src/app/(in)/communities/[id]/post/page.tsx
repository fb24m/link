import { Editor } from '@/components/Editor/Editor.component'
import { prisma } from '@/services/Prisma.service'
import { getSelf } from '@/services/Prisma/getSelf'
import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'

const CommunitiesPost = async ({ params }: { params: { id: string } }): Promise<ReactElement> => {
	const community = await prisma.community.findUnique({ where: { id: +params.id } })
	const user = await getSelf()

	if (community?.ownerId !== user?.data?.id) notFound()

	return (
		<Editor publishDate={new Date()} user={community as any} new />
	)
}

export default CommunitiesPost
