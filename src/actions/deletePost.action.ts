"use server";

import { exists } from "@/functions/exists";
import { deletePost as deletePostById } from "@/services/Prisma/post/delete";
import { users } from "@/shared/api/users";
import { revalidateTag } from "next/cache";
import { revalidatePath } from "next/cache";

export const deletePost = async (formData: FormData): Promise<void> => {
  const id = +exists(formData.get("post-id"));
  const authorId = +exists(formData.get("author-id"));

  await deletePostById(id);
  revalidateTag(`posts?authorId=${authorId}`);
  revalidatePath("/profile");
  revalidatePath(`/user/${(await users.get(authorId)).username}`);
};
