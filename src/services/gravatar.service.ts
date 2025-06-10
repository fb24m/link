import { hashValue } from '@/functions/generateHash'
import type { IGravatar } from '@/shared/interfaces/Gravatar.interface'

export const gravatar = {
	getAvatar: async (email: string | null): Promise<IGravatar> => await fetch(`https://gravatar.com/${await hashValue(email)}.json`).then((data) => data.json())
}
