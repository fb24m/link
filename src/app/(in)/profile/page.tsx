import type { ReactElement } from "react";
import styles from "./page.module.scss";

import { exists } from "@/functions/exists";
import { UserProfile } from "@/widgets/UserProfile/UserProfile.component";
import { Posts } from "@/components/Posts/Posts";
import { redirect } from "next/navigation";
import { posts } from "@/shared/api/posts";
import { users } from "@/shared/api/users";
import { ProfileMenu } from "@/entities/profile/ProfileMenu/ProfileMenu";

export const revalidate = 31536000;

const Welcome = async (): Promise<ReactElement> => {
  const user = await users.getMe();

  if (!user) {
    redirect("/login");
  }

  const myposts = await posts.getByAuthorId(user.id);

  return (
    <div className={styles.profile}>
      <UserProfile
        postsCount={exists<number>(myposts?.length)}
        selfProfile
        user={user}
      />
      <ProfileMenu />
      {/* TODO: fix typification */}
      <Posts
        controls
        author={user}
        posts={myposts ? myposts.filter((post: any) => !post.deleted) : []}
      />
    </div>
  );
};

export default Welcome;
