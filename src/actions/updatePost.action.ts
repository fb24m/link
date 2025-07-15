"use server";

import { exists } from "@/functions/exists";
import { prisma } from "@/services/Prisma.service";
import { updatePost as prisma_updatePost } from "@/services/Prisma/post/update";
import { users } from "@/shared/api/users";
import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const updatePost = async (formData: FormData): Promise<void> => {
  const rawData = {
    content: exists(formData.get("content")) as string,
    id: +exists(formData.get("id")),
  };

  const post = await prisma_updatePost(
    rawData.id,
    rawData.content.split("<").join("&lt;").split(">").join("&gt;"),
  );

  await prisma.postMention.deleteMany({
    where: {
      postId: rawData.id,
    },
  });

  const mentions = rawData.content.match(/@\w+/g) || [];
  const uniqueMentions = [
    ...new Set(mentions.map((item) => item.replace("@", ""))),
  ];

  if (mentions.length > 0) {
    const mentionedUsers = await prisma.user.findMany({
      where: {
        username: {
          in: uniqueMentions,
        },
      },
    });

    await prisma.postMention.createMany({
      data: [
        ...mentionedUsers.map((user) => ({
          postId: post.id,
          userId: user.id,
        })),
      ],
    });
  }

  revalidateTag(`posts?authorId=${post.authorId}`);
  revalidatePath("/profile");
  revalidatePath(`/user/${(await users.get(+post.authorId!)).username}`);
  redirect("/profile");
};
