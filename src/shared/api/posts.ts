import { request } from '@/shared/api/helpers/request'
import { Post } from '../../../generated/prisma/client'

export type PostType = Post & { _count: { comments: number } }

export const posts = {
  getByAuthorId: (authorId: number, opts?: { max?: number; fields?: string }): Promise<PostType[]> =>
    request(
      `/posts?authorId=${authorId}${opts?.max ? `&max=${opts.max}` : ''}${opts?.fields ? `&fields=${opts.fields}` : ''}`
    ),
  getByAuthorsIds: async (ids: number[]): Promise<PostType[]> => request(`/posts/?authorId=${ids.join(',')}`),
  getDeleted: (): Promise<PostType[]> => request(`/posts?deleted=true`),
  getById: (id: number): Promise<PostType[]> => request<PostType[]>(`/posts/${id}`),
  getByMention: async (mention: number): Promise<PostType[]> => request(`/posts?mentioned=${mention}`),
  getRecommendations: async (): Promise<PostType[]> => request(`/recommendations`),
}
