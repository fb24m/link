"use server";

import { users } from "@/shared/api/users";
import { prisma } from "../Prisma.service";
import { Post, User } from "@prisma/client";

export const createPost = async (content: string, me: User): Promise<Post> => {
  return await prisma.post.create({
    data: {
      content: content.split("\r\n").join("<br>"),
      authorId: me.id,
      writtenBy: me.id,
    },
  });
};
