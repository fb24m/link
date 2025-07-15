import { prisma } from "@/services/Prisma.service";
import { users } from "@/shared/api/users";
import { Post } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const queryParams = new URLSearchParams(new URL(request.url).search);

  const authorId = queryParams.get("authorId")!;

  if (authorId) {
    return Response.json({
      ok: true,
      message: "success",
      code: 200,
      data: await prisma.post.findMany({
        where: {
          authorId: authorId.includes(",")
            ? {
                in: authorId.split(",").map((i) => +i),
              }
            : +authorId,
          deleted: false,
        },
      }),
    });
  } else {
    return Response.json({
      ok: true,
      message: "success",
      code: 200,
      data: await prisma.post.findMany({
        where: {
          authorId: (await users.getMe()).id,
          deleted: true,
        },
      }),
    });
  }

  return Response.json({
    ok: false,
    message: "Not found",
    code: 404,
  });
};
