import { prisma } from '@/services/Prisma.service'
import type { ReactElement } from 'react'

const CommunityPage = async ({ params }: { params: { id: string } }): Promise<ReactElement> => {
	const community = await prisma.community.findUnique({
		where: {
			id: +params.id
		}
	})

	return (
		<div>
			Сообщество: {community?.name}
		</div>
	)
}

export default CommunityPage
