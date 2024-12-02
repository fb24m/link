import { IUser } from '@/shared/interfaces/IUser.interface'

export interface UserProfileProps {
	addPostButton?: boolean
	subscribeButton?: boolean
	selfProfile?: boolean
	postsCount: number
	user: IUser
}
