import type { IPost } from '@/shared/interfaces/IPost.interface'
import type { IUser } from '@/shared/interfaces/IUser.interface'

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
