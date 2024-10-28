import { request } from '@/shared/api/helpers/request'
import { API } from './helpers/env'

export const posts = {
	getByAuthorId: async (authorId: number) => (await request(`${API}/posts?authorId=${authorId}`)).data,
	getByAuthorsIds: async (ids: number[]) => (await request(`${API}/posts/${ids.join(',')}`)).posts,
}