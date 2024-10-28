import { request } from '@/shared/api/helpers/request'
import { API } from './helpers/env'

export const posts = {
	getByAuthorId: async (authorId: number) => (await request(`${API}/posts?authorId=${authorId}`, {
		next: {
			revalidate: 3600
		}
	})).data
}