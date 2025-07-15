import type { ReactElement } from "react";
import styles from "./page.module.css";

import { Sidebar } from "@/features/Sidebar/Sidebar.component";
import { Container } from "@/components/Container/Container.component";
import { Header } from "@/widgets/Header/Header";
import { Card } from "@/ui/components/Card/Card.component";
import { Posts } from "@/components/Posts/Posts";
import { Button } from "@/ui/components/Button/Button.component";
import { request } from "@/shared/api/helpers/request";
import { Post } from "@prisma/client";
import { users } from "@/shared/api/users";

const Home = async (): Promise<ReactElement> => {
  const user = await users.getMe();

  const { ok, data: posts } = await request<{ ok: boolean; data: Post[] }>(
    "recommendations",
  );

  return (
    <>
      <Header />
      <Container className="main-container">
        {typeof user !== "undefined" && <Sidebar />}
        <div className={styles.posts}>
          {ok ? (
            <Posts posts={posts} />
          ) : (
            <Card className={styles.login}>
              Войдите, чтобы просматривать посты своих друзей в ленте
              <div className={styles.buttonBox}>
                <Button href="/login" appearance="primary">
                  Войти
                </Button>
              </div>
            </Card>
          )}
        </div>
      </Container>
    </>
  );
};

export default Home;
