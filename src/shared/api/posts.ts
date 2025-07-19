import { request } from '@/shared/api/helpers/request'
import { Post } from '@prisma/client'

export const posts = {
  getByAuthorId: (authorId: number): Promise<Post[]> => request(`/posts?authorId=${authorId}`),
  getByAuthorsIds: async (ids: number[]): Promise<Post[]> => request(`/posts/?authorId=${ids.join(',')}`),
  getDeleted: (): Promise<Post[]> => request(`/posts?deleted=true`),
  getById: (id: number): Promise<Post[]> => request<Post[]>(`/posts/${id}`),
}
