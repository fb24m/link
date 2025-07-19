import type { IDisplayMessage } from './DisplayMessage.interface'
import type { User } from '@prisma/client'

export interface MessagesProps {
  messages: IDisplayMessage[]
  user: User
}
