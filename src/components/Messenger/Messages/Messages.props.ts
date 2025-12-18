import type { IDisplayMessage } from './DisplayMessage.interface'
import type { User } from '../../../../generated/prisma/client'

export interface MessagesProps {
  messages: IDisplayMessage[]
  user: User
}
