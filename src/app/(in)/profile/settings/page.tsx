import type { ReactElement } from 'react'

import { redirect } from 'next/navigation'
import { posts } from '@/shared/api/posts'
import styles from './page.module.css'

import { UserProfile } from '@/widgets/UserProfile/UserProfile.component'
import { Title1 } from '@/ui/components/Title1/Title1.component'
import { Button } from '@/ui/components/Button/Button.component'
import { Card } from '@/ui/components/Card/Card.component'

import { DeleteProfilePopup } from '@/features/profile-settings/DeleteProfilePopup/DeleteProfilePopup'
import { ChangePasswordForm } from '@/features/profile-settings/ChangePasswordForm/ChangePasswordForm'
import { ChangeUsernameForm } from '@/features/profile-settings/ChangeUsernameForm/ChangeUsernameForm'
import { LogoutPopup } from '@/features/profile-settings/Logout/LogoutPopup/LogoutPopup'
import { users } from '@/shared/api/users'
import { LinksPopup } from '@/features/profile-settings/LinksBlock/LinksPopup/LinksPopup'

const ProfileSetting = async (): Promise<ReactElement> => {
	const user = await users.getMe()
	const myPosts = await posts.getByAuthorId(user?.id ?? 0)
	const links = await users.getLinksByUsername(user?.username ?? '')

	if (!user) { redirect('/login') }

	return (
		<div>
			<UserProfile selfProfile user={user} postsCount={myPosts.length} />

			<div className={styles.header}>
				<Button className={styles.back} appearance="transparent" icon="arrow_back" href="/profile">В профиль</Button>
			</div>

			<Title1 className={styles.title}>Настройки</Title1>

			<div className={styles.grid}>
				<div className={styles.cards}>
					<Card>
						<h2 className={styles.title2}>Изменить пароль</h2>
						<ChangePasswordForm />
					</Card>
				</div>
				<div className={styles.cards}>
					<Card>
						<h2 className={styles.title2}>Изменить имя пользователя</h2>
						<ChangeUsernameForm />
					</Card>
					<Card className={styles.block}>
						<h2 className={styles.title2}>Ссылки</h2>
						<LinksPopup userLinks={links} />
					</Card>
				</div>
			</div>
			<Card className={styles.logout}>
				<h2 className={styles.title2}>
					Выход из аккаунта
				</h2>
				<LogoutPopup />
			</Card>
			<Card className={styles.dangerous}>
				<details className={styles.details}>
					<summary className={styles.title2}>
						<span className={`${styles.detailsClosedTitle} ${styles.title2}`}>Другое</span>
						<span className={`${styles.detailsOpenedTitle} ${styles.title2}`}>Удаление профиля</span>
					</summary>

					<div className={styles.deleteButton}>
						<DeleteProfilePopup />
					</div>

				</details>
			</Card>
		</div>
	)
}

export default ProfileSetting
