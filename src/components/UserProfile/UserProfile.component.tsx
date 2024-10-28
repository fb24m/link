import type { ReactElement } from 'react'
import styles from './UserProfile.module.scss'
import type { UserProfileProps } from './UserProfile.props'
import { exists } from '@/functions/exists'
import { checkSubscription } from '@/services/Prisma/checkSubscription'
import { subscribe } from '@/actions/subscribe.action'
import { SubmitButton } from '../SubmitButton/SubmitButton.component'
import { Button } from '@/ui/components/Button/Button.component'
import { CopyButton } from '../CopyButton/CopyButton.component'
import { Body1 } from '@/ui/components/Body1/Body1.component'
import { ChangeBioPopup } from '@/popups/ChangeBioPopup'
import { cookies } from 'next/headers'
import { ChangeAvatarPopup } from './ChangeAvatarPopup/ChangeAvatarPopup'

export const UserProfile = async (props: UserProfileProps): Promise<ReactElement> => {
	return (
        (<div className={styles.profile}>
            <div className={styles.user}>
				{props.selfProfile
					? <ChangeAvatarPopup buttonContent={
						<>
							<img src={exists(props.user?.avatar)} className={styles.avatar}></img>
							<img src={exists(props.user?.avatar)} className={styles.glow}></img>
						</>
					} />
					: <>
						<img src={exists(props.user?.avatar)} className={styles.avatar}></img>
						<img src={exists(props.user?.avatar)} className={styles.glow}></img>
					</>}
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
					{props.user?.username} {props.user?.badge !== null ? <span className={styles.badge}>{props.user?.badge}</span> : ''}
				</div>
				<div className={styles.buttons}>
					{props.selfProfile !== true && (await cookies()).has('link_saved_user')
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
				</div>
			</div>
            <div className={styles.about}>
				<Body1 className={styles.bio}>
					{props.user?.bio}
				</Body1>
				{props.selfProfile === true
					? <ChangeBioPopup currentBio={props.user?.bio} buttonText={props.user?.bio === null || props.user?.bio === '' ? 'Добавить пару строк о себе' : 'Изменить'} />
					: ''}
			</div>
        </div >)
    );
}
