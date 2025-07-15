import { prisma } from "@/services/Prisma.service";
import { Button } from "@/ui/components/Button/Button.component";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
// import styles from './page.module.scss'
import { Posts } from "@/components/Posts/Posts";

const CommunityPage = async (props: {
  params: Promise<{ id: string }>;
}): Promise<ReactElement> => {
  const params = await props.params;
  const community = await prisma.community.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!community) notFound();

  const posts = await prisma.post.findMany({
    where: {
      authorId: +params.id,
    },
  });

  return (
    <div>
      Сообщество: {community?.name}
      <Button
        icon="create"
        appearance="primary"
        href={`/communities/${params.id}/post`}
      >
        Новый пост
      </Button>
      <Posts posts={posts} />
    </div>
  );
};

export default CommunityPage;
