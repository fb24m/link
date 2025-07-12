import { prisma } from '@/services/Prisma.service'

interface IMessage {
	id: number
	chatName: string
	date?: Date | null
	author?: string | null
	content: string
}

export const getMessages = async (chatName: string): Promise<IMessage[] | null> => {
	const messages = await prisma.message.findMany({
		where: { chatName }
	})

	return messages
}
