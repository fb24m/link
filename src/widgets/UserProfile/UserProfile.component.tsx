import { Body1 } from '@/ui/components/Body1/Body1.component'
import { Button } from '@/ui/components/Button/Button.component'

import { CopyButton } from '../../components/CopyButton/CopyButton.component'
import { SocialIcon } from '@/shared/icons/SocialIcon'

import type { ReactElement } from 'react'

import type { UserProfileProps } from './UserProfile.props'
import { users } from '@/shared/api/users'

import styles from './UserProfile.module.scss'
import Link from 'next/link'
import Icon from '@/ui/components/Icon/Icon.component'
import dynamic from 'next/dynamic'

const ChangeBioPopup = dynamic(() => import('@/features/profile/ChangeBioPopup/ChangeBioPopup'))
const ChangeAvatarPopup = dynamic(() => import('../../features/profile/ChangeAvatarPopup/ChangeAvatarPopup'))

export const UserProfile = async ({ user, ...props }: UserProfileProps): Promise<ReactElement> => {
	const { username, avatar, statusIcon, statusTooltip, badge, bio, pronouns } = user

	const links = await users.getLinksByUsername(username)

	return (
		(<div className={styles.profile}>
			<div className={styles.header}>
				<img src={avatar ?? undefined} className={styles.headerImage} draggable={false} />
			</div>
			<div className={styles.headerGlow}>
				<img src={avatar ?? undefined} className={styles.headerImage} draggable={false} />
			</div>
			<div className={styles.user}>
				<div className={styles.avatar}>
					{props.selfProfile
						? <ChangeAvatarPopup buttonContent={<img src={avatar ?? undefined} className={styles.avatar} />} />
						: <img src={avatar ?? undefined} className={styles.avatar} />}
					{statusIcon && statusTooltip && <div className={styles.statusIcon}>
						<Icon title={statusTooltip} icon={statusIcon} />
					</div>}
				</div>
				<div className={styles.counters}>
					<div className={styles.counter}>
						<span className={styles.count}>0</span>
						<span className={styles.description}>подписчики</span>
					</div>
					<div className={styles.counter}>
						<span className={styles.count}>{props.postsCount}</span>
						<span className={styles.description}>посты</span>
					</div>
				</div>
			</div>
			<div className={styles.username}>
				<div className={styles.userInfo}>
					{username} {pronouns && <span className={styles.pronouns}>{pronouns}</span>} {badge && <span className={styles.badge}>{badge}</span>}
				</div>
				<div className={styles.buttons}>
					{/* {!props.selfProfile && loggedIn &&
						<form action={subscribe}>
							<input type="text" name="channel-id" readOnly className={styles.channelId} value={id} />
							<SubmitButton disabled title="Кнопка подписки временно отключена из-за ошибок">
								{(await checkSubscription(id)) ? 'Отписаться' : 'Подписаться'}
							</SubmitButton>
						</form>} */}
					<CopyButton success="Ссылка на профиль ($0) скопирована" appearance="secondary" icon="share" text={`https://link.fb24m.ru/user/${username}`}>Поделится</CopyButton>
					{props.selfProfile && <Button appearance="secondary" icon="settings" href={`/profile/settings`} />}
				</div>
			</div>
			<div className={styles.about}>
				<Body1 className={styles.bio}>{bio}</Body1>

				{props.selfProfile &&
					<ChangeBioPopup currentBio={bio} buttonText={!bio ? 'Добавить пару строк о себе' : 'Изменить'} />}
			</div>
			{links.length > 0 &&
				<ul className={styles.links}>
					{/* TODO: fix typization */}
					{links.map((link: any) =>
						<li key={link.id}>
							<Link className={styles.link} href={link.link}>
								<SocialIcon icon={link.icon} /> {link.link.split('/')[link.link.split('/').length - 1]}
							</Link>
						</li>
					)}
				</ul>
			}
		</div>)
	)
}
