import { Body1 } from "@/ui/components/Body1/Body1.component";
import { Button } from "@/ui/components/Button/Button.component";

import { CopyButton } from "../../components/CopyButton/CopyButton.component";
import { SocialIcon } from "@/shared/icons/SocialIcon";

import type { ReactElement } from "react";

import type { UserProfileProps } from "./UserProfile.props";
import { users } from "@/shared/api/users";

import styles from "./UserProfile.module.scss";
import Link from "next/link";
import Icon from "@/ui/components/Icon/Icon.component";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { SubscribeButton } from "@/entities/profile/SubscribeButton";
import { clsx } from "@/functions/clsx";
import { PopupTrigger } from "@/ui/components/PopupTrigger/PopupTrigger.component";
import { PopupFooter } from "@/ui/components/PopupFooter/PopupFooter.component";
import { PopupWrapper } from "@/ui/components/PopupWrapper/PopupWrapper.component";
import { Popup } from "@/ui/components/Popup/Popup.component";

const ChangeBioPopup = dynamic(
  () => import("@/features/profile/ChangeBioPopup/ChangeBioPopup"),
);
const ChangeAvatarPopup = dynamic(
  () => import("../../features/profile/ChangeAvatarPopup/ChangeAvatarPopup"),
);

function stringToNumber255(input: string): number {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    sum += input.charCodeAt(i);
  }
  // приводим к диапазону 1..255
  return sum % 255 || 1;
}

export const UserProfile = async ({
  user,
  ...props
}: UserProfileProps): Promise<ReactElement> => {
  const {
    id,
    username,
    avatar,
    statusIcon,
    statusTooltip,
    badge,
    bio,
    pronouns,
  } = user;

  const self = await users.getMe();

  const links = await users.getLinksByUsername(username);

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <img
          src={avatar ?? undefined}
          className={styles.headerImage}
          draggable={false}
        />
      </div>
      <div className={styles.headerGlow}>
        <img
          src={avatar ?? undefined}
          className={styles.headerImage}
          draggable={false}
        />
      </div>
      <div className={styles.user}>
        <div className={styles.avatar}>
          {props.selfProfile ? (
            <ChangeAvatarPopup
              buttonContent={
                <img
                  src={avatar ?? undefined}
                  alt={username[0].toUpperCase()}
                  className={styles.avatar}
                  style={{
                    ...(!avatar && {
                      backgroundColor: `hsl(${stringToNumber255(username)}, 100%, 50%)`,
                    }),
                  }}
                />
              }
            />
          ) : (
            <img
              src={avatar ?? undefined}
              alt={username[0].toUpperCase()}
              className={styles.avatar}
              style={{
                ...(!avatar && {
                  backgroundColor: `hsl(${stringToNumber255(username)}, 100%, 50%)`,
                }),
              }}
            />
          )}
          {statusIcon && statusTooltip && (
            <div className={styles.statusIcon}>
              <Icon title={statusTooltip} icon={statusIcon} />
            </div>
          )}
        </div>
        <div className={styles.counters}>
          <div className={styles.counter}>
            <span className={styles.count}>{user.suspended ? 0 : 0}</span>
            <span className={styles.description}>подписчики</span>
          </div>
          <div className={styles.counter}>
            <span className={styles.count}>
              {user.suspended ? 0 : props.postsCount}
            </span>
            <span className={styles.description}>посты</span>
          </div>
        </div>
      </div>
      <div className={styles.username}>
        <div className={styles.userInfo}>
          {username}{" "}
          {pronouns && <span className={styles.pronouns}>{pronouns}</span>}{" "}
          {badge && (
            <Popup>
              <PopupWrapper>
                Это подтвержденный аккаунт представителя NextLink
                <PopupFooter></PopupFooter>
              </PopupWrapper>
              <PopupTrigger>
                <span
                  className={clsx(
                    styles.badge,
                    badge === "NextLink" && styles.nextLink,
                  )}
                >
                  {badge} <Icon icon="question_mark"></Icon>
                </span>
              </PopupTrigger>
            </Popup>
          )}
        </div>
        <div className={styles.buttons}>
          {!props.selfProfile && !user.suspended && (
            <SubscribeButton from={self.id} to={id} username={username} />
          )}
          <CopyButton
            success="Ссылка на профиль ($0) скопирована"
            appearance="secondary"
            icon="share"
            text={`https://link.fb24m.ru/user/${username}`}
          >
            Поделится
          </CopyButton>
          {props.selfProfile && (
            <Button
              appearance="secondary"
              icon="settings"
              href={`/profile/settings`}
            />
          )}
        </div>
      </div>
      <div className={styles.about}>
        {!user.suspended && <Body1 className={styles.bio}>{bio}</Body1>}

        {props.selfProfile && (
          <ChangeBioPopup
            currentBio={bio}
            buttonText={!bio ? "Добавить пару строк о себе" : "Изменить"}
          />
        )}
      </div>
      {links.length > 0 && (
        <ul className={styles.links}>
          {/* TODO: fix typification */}
          {links.map((link: any) => (
            <li key={link.id}>
              <Link className={styles.link} href={link.link}>
                <SocialIcon icon={link.icon} />{" "}
                {link.link.split("/")[link.link.split("/").length - 1]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
