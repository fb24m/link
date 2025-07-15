import { request } from "@/shared/api/helpers/request";

export const posts = {
  getByAuthorId: async (authorId: number) =>
    (await request(`/posts?authorId=${authorId}`)).data,
  getByAuthorsIds: async (ids: number[]) =>
    (await request(`/posts/?authorId=${ids.join(",")}`)).data,
  getDeleted: async () => (await request(`/posts?deleted=true`)).data,
  getById: async (id: number) => (await request(`/posts/${id}`)).posts,
};
