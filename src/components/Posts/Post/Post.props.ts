import type { IPost } from '@/interfaces/IPost.interface'
import type { IUser } from '@/interfaces/IUser.interface'

export interface PostProps {
	author?: IUser
	authorAvatarUrl?: string | undefined
	imageUrl?: string | undefined
	controls?: boolean | undefined
	full?: boolean | undefined
	restore?: boolean | undefined
	likes?: number | undefined
	self?: IUser
	post: IPost
}
