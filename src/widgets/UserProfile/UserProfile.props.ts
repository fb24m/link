import { User } from '@prisma/client'

export interface UserProfileProps {
	addPostButton?: boolean
	subscribeButton?: boolean
	selfProfile?: boolean
	postsCount: number
	user: User
}
