import type { ReactElement } from 'react'

import { UserProfile } from '@/components/UserProfile/UserProfile.component'
import { redirect } from 'next/navigation'
import { getCurrentAuth } from '@/services/Prisma/user/getCurrentAuth'
import { posts } from '@/shared/api/posts'
import { Title1 } from '@/ui/components/Title1/Title1.component'
import styles from './page.module.css'
import { Input } from '@/ui/components/Input/Input'
import { Button } from '@/ui/components/Button/Button.component'
import { Card } from '@/ui/components/Card/Card.component'
import { Popup } from '@/ui/components/Popup/Popup.component'
import { DeleteProfilePopup } from '@/features/profile-settings/DeleteProfilePopup/DeleteProfilePopup'
import { ChangePasswordForm } from '@/features/profile-settings/ChangePasswordForm/ChangePasswordForm'

const ProfileSetting = async (): Promise<ReactElement> => {
	const user = (await getCurrentAuth()).data
	const myposts = await posts.getByAuthorId(user?.id ?? 0)

	if (!user) { redirect('/login') }

	return (
		<div>
			<UserProfile selfProfile user={user} postsCount={myposts.length} />

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

				</div>
			</div>
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
