import type { IUser } from '@/shared/interfaces/IUser.interface'
import type { IDisplayMessage } from './DisplayMessage.interface'

export interface MessagesProps {
	messages: IDisplayMessage[]
	user: IUser
}
