import { gravatar } from "@/services/gravatar.service";
import { prisma } from "@/services/Prisma.service";
import type { NextRequest } from "next/server";

// TODO: Fix typization
export const GET = async (
  _: NextRequest,
  props: { params: Promise<{ username: string }> },
): Promise<any> => {
  const params = await props.params;
  let user = await prisma.user.findUnique({
    where: {
      ...(!/^\d+$/.test(params.username)
        ? { username: params.username }
        : { id: +params.username }),
    },
  });

  if (!user)
    return Response.json({ ok: false, code: 404, message: "not found" });

  const safeUser = {
    ...user,
    password: undefined,
    savedArticles: user?.savedArticles
      ?.split("/")
      .map((item) => +item)
      .filter((item) => item),
  };

  return Response.json({
    ok: true,
    code: 200,
    message: "success",
    data: safeUser,
  });
};
