import { hashValue } from '@/functions/generateHash'
import { request } from '@/functions/request'
import type { IGravatar } from '@/shared/interfaces/Gravatar.interface'

export const gravatar = {
	getAvatar: async (email: string | null) => await request<IGravatar>(`https://gravatar.com/${await hashValue(email)}.json`)
}
