import { Body1 } from '@/ui/components/Body1/Body1.component'
import { Button } from '@/ui/components/Button/Button.component'

import { ChangeAvatarPopup } from './ChangeAvatarPopup/ChangeAvatarPopup'
import { SubmitButton } from '../SubmitButton/SubmitButton.component'
import { CopyButton } from '../CopyButton/CopyButton.component'
import { ChangeBioPopup } from '@/popups/ChangeBioPopup'
import { SocialIcon } from '@/shared/icons/SocialIcon'

import type { ReactElement } from 'react'
import { exists } from '@/functions/exists'
import { cookies } from 'next/headers'

import type { UserProfileProps } from './UserProfile.props'
import { checkSubscription } from '@/services/Prisma/checkSubscription'
import { users } from '@/shared/api/users'
import { subscribe } from '@/actions/subscribe.action'

import styles from './UserProfile.module.scss'
import Link from 'next/link'
import Icon from '@/ui/components/Icon/Icon.component'

export const UserProfile = async (props: UserProfileProps): Promise<ReactElement> => {
	const links = await users.getLinksByUsername(props.user.username)

	console.log(props.user)

	return (
		(<div className={styles.profile}>
			<div className={styles.user}>
				<div className={styles.avatar}>
					{props.selfProfile
						? <ChangeAvatarPopup buttonContent={
							<>
								<img src={props.user?.avatar ?? undefined} className={styles.avatar}></img>
								<img src={props.user?.avatar ?? undefined} className={styles.glow}></img>
							</>
						} />
						: <>
							<img src={exists(props.user?.avatar)} className={styles.avatar}></img>
							<img src={exists(props.user?.avatar)} className={styles.glow}></img>
						</>}
					{props.user?.statusIcon && props.user.statusTooltip && <div className={styles.statusIcon}>
						<Icon title={props.user.statusTooltip} icon={props.user?.statusIcon} />
					</div>}
				</div>
				<div className={styles.counters}>
					<div className={styles.counter}>
						<span className={styles.count}>0</span>
						<span className={styles.description}>друзья</span>
					</div>
					<div className={styles.counter}>
						<span className={styles.count}>{+exists(props.user?.subscribers)}</span>
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
					{props.user?.username} {props.user?.badge ? <span className={styles.badge}>{props.user?.badge}</span> : ''}
				</div>
				<div className={styles.buttons}>
					{!props.selfProfile && (await cookies()).has('link_saved_user')
						? <><form action={subscribe}>
							<input type="text" name="channel-id" readOnly className={styles.channelId} value={props.user?.id} />
							<SubmitButton disabled title="Кнопка подписки временно отключена из-за ошибок">
								{(await checkSubscription(exists<number>(props.user.id))) ? 'Отписаться' : 'Подписаться'}
							</SubmitButton>
						</form>
							<Button appearance="secondary" icon="chat" href={`/user/${props.user?.username}/messenger`}></Button>
						</>
						: ''}
					<CopyButton success="Ссылка на профиль ($0) скопирована" appearance="secondary" icon="share" text={`https://link.fb24m.ru/user/${props.user?.username}`}>Поделится</CopyButton>
					{props.selfProfile &&
						<Button appearance="secondary" icon="settings" href={`/profile/settings`}></Button>}
				</div>
			</div>
			<div className={styles.about}>
				{props.user?.pronouns && <>
					<span className={styles.pronouns}>{props.user?.pronouns}</span></>}
				<Body1 className={styles.bio}>{props.user?.bio}</Body1>

				{props.selfProfile &&
					<ChangeBioPopup
						currentBio={props.user?.bio}
						buttonText={!props.user?.bio ? 'Добавить пару строк о себе' : 'Изменить'}
					/>}
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
		</div >)
	);
}
