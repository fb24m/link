import type { ReactElement } from "react";

import { UserProfile } from "@/widgets/UserProfile/UserProfile.component";
import { Posts } from "@/components/Posts/Posts";
import { redirect } from "next/navigation";
import { users } from "@/shared/api/users";
import { posts } from "@/shared/api/posts";
import { ProfileMenu } from "@/entities/profile/ProfileMenu/ProfileMenu";

export const revalidate = 31536000;

const Welcome = async (): Promise<ReactElement> => {
  const user = await users.getMe();

  const deletedPosts = await posts.getDeleted();

  return (
    <div>
      <UserProfile selfProfile user={user} postsCount={0} />
      <ProfileMenu />
      <Posts restore controls posts={deletedPosts} author={user} />
    </div>
  );
};

export default Welcome;
