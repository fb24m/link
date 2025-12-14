import { request } from '@/shared/api/helpers/request'
import { Post } from '@prisma/client'

export const posts = {
  getByAuthorId: (authorId: number, opts?: { max?: number; fields?: string }): Promise<Post[]> =>
    request(
      `/posts?authorId=${authorId}${opts?.max ? `&max=${opts.max}` : ''}${opts?.fields ? `&fields=${opts.fields}` : ''}`
    ),
  getByAuthorsIds: async (ids: number[]): Promise<Post[]> => request(`/posts/?authorId=${ids.join(',')}`),
  getDeleted: (): Promise<Post[]> => request(`/posts?deleted=true`),
  getById: (id: number): Promise<Post[]> => request<Post[]>(`/posts/${id}`),
}
