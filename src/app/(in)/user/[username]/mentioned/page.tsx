import type { ReactElement } from "react";

import { UserProfile } from "@/widgets/UserProfile/UserProfile.component";
import { Posts } from "@/components/Posts/Posts";
import { redirect } from "next/navigation";
import { users } from "@/shared/api/users";
import { posts } from "@/shared/api/posts";
import { ProfileMenu } from "@/entities/profile/ProfileMenu/ProfileMenu";
import { prisma } from "@/services/Prisma.service";

const Welcome = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<ReactElement> => {
  const { username } = await params;

  const user = await users.get(username);

  const mentions = await prisma.postMention.findMany({
    where: {
      userId: user.id,
    },
    select: {
      postId: true,
    },
  });

  const postIds = mentions.map((mention) => mention.postId);

  const posts = await prisma.post.findMany({
    where: {
      id: {
        in: postIds,
      },
      deleted: false,
    },
  });

  return (
    <div>
      <UserProfile selfProfile user={user} postsCount={0} />
      <ProfileMenu />
      <Posts whoMentioned={username} posts={posts} />
    </div>
  );
};

export default Welcome;
