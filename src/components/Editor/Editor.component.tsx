import styles from "./Editor.module.scss";
import { updatePost } from "@/actions/updatePost.action";
import type { ReactElement, ReactNode } from "react";
import { createPost } from "../../actions/createPost.action";
import { exists } from "@/functions/exists";
import { SubmitButton } from "@/components/SubmitButton/SubmitButton.component";
import Link from "next/link";
import { users } from "@/shared/api/users";
import { Header } from "@/widgets/Header/Header";
import { BackButton } from "../BackButton/BackButton.component";
import { Card } from "@/ui/components/Card/Card.component";
import { Button } from "@/ui/components/Button/Button.component";
import { EditorArea } from "@/entities/editor/EditorArea/EditorArea";
import { Post } from "@prisma/client";

export interface EditorProps {
  post?: Post;
  button?: ReactNode;
  publishDate?: Date;
  new?: boolean;
  user?: { name: string | null };
}

export const Editor = async (props: EditorProps): Promise<ReactElement> => {
  const now =
    typeof props.post?.publishDate !== "undefined"
      ? props.post?.publishDate
      : props.publishDate;
  const date = `${now?.getDate()}.${exists(now?.getMonth()) + 1}.${now?.getFullYear()}`;
  const author = await users.getMe();

  return (
    <div className={styles.wrapper}>
      {/* <Header fullWidth /> */}
      <form
        action={props.new ? createPost : updatePost}
        className={styles.form}
      >
        <input
          type="text"
          style={{ display: "none" }}
          name="id"
          readOnly
          value={props.post?.id}
        />
        <div className={styles.post}>
          <EditorArea
            defaultValue={props.post?.content.split("<br>").join("\n")}
          />
        </div>
        <div className={styles.sidebar}>
          <BackButton
            className={styles.backButton}
            appearance="transparent"
            icon="arrow_back"
          >
            Назад
          </BackButton>
          <div className={styles.sidebarBlock}>
            <span className={styles.title}>
              {props.new ? "Создать" : "Изменить"} пост
            </span>
          </div>
          {props.user?.name && (
            <div className={styles.sidebarBlock}>
              Публикация: {props.user?.name}
            </div>
          )}
          <div className={styles.sidebarBlock}>Автор: {author?.username}</div>
          <div className={styles.sidebarBlock}>Дата публикации: {date}</div>
          <details className={styles.instruction}>
            <summary>Форматирование</summary>
            <Card className={styles.formatingExamples}>
              <p>
                **<strong>жирный текст</strong>**
              </p>
              <p>
                *<i>курсивный текст</i>*
              </p>
              <p>
                ~~<del>зачеркнутый текст</del>~~
              </p>
              <p>
                <Link href="/profile/fb24m">@fb24m</Link> - упоминание
              </p>
              <p>!(Описание)[ссылка] - вставка картинки</p>
              <Button appearance="secondary" href="/article/86">
                Подробнее
              </Button>
            </Card>
          </details>
          <SubmitButton
            className={styles.button}
            icon={props.new === true ? "add_circle" : "update"}
          >
            {props.new === true ? "Создать" : "Изменить"}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};
