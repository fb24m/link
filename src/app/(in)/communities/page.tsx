import { Container } from '@/components/Container/Container.component'
import { Card } from '@/ui/components/Card/Card.component'
import { Title1 } from '@/ui/components/Title1/Title1.component'
import type { ReactElement } from 'react'
import styles from './page.module.scss'
import { Input } from '@/ui/components/Input/Input'
import Textarea from '@/ui/components/Textarea/Textarea.component'
import { Radio } from '@/ui/components/Radio/Radio'
import { clsx } from '@/functions/clsx'
import { prisma } from '@/services/Prisma.service'
import Image from 'next/image'
import { SubmitButton } from '@/components/SubmitButton/SubmitButton.component'
import { users } from '@/shared/api/users'

const createCommunity = async (formData: FormData): Promise<void> => {
	'use server'

	const name = formData.get('name') as string
	const bio = formData.get('bio') as string
	// @ts-expect-error null
	const ownerId = +formData.get('owner-id')
	const visibility = formData.get('visibility') as string

	await prisma.community.create({
		data: { bio, ownerId, visibility, name, admins: `,${ownerId},` }
	})
}

const Communities = async (): Promise<ReactElement> => {
	const user = await users.getMe()

	return (
		<Container>
			<Title1>Пришло время создать свое сообщество.</Title1>
			<Card className={styles.card}>
				<form className={styles.form} action={createCommunity}>
					<div className={styles.block}>
						<h3 className={styles.title}>Придумайте название:</h3>
						<div className={styles.inputBlock}>
							<Input className={styles.input} name="name" type="text" placeholder="Новое сообщество" required />
						</div>
					</div>
					<div className={styles.block}>
						<h3 className={styles.title}>Описание сообщества:</h3>
						<div className={styles.inputBlock}>
							<Textarea className={styles.input} name="bio" type="text" placeholder="Сообщество на NextLink" />
						</div>
					</div>
					<div className={styles.block}>
						<h3 className={clsx(styles.title, styles.smallBlock)}>Ваше сообщество будет:</h3>
						<div className={clsx(styles.inputBlock, styles.flex)}>
							<Radio required label="Открытым" name="visibility" value="public" />
							<Radio required label="Закрытым" name="visibility" value="private" />
						</div>
					</div>
					<div className={styles.block}>
						<h3 className={clsx(styles.title, styles.smallBlock)}>Владелец сообщества:</h3>
						<div className={styles.owner}>
							<Image src={user?.data?.avatar ? user?.data?.avatar : ''} alt="" width={32} height={32} />
							{user?.data?.username}
							<span className={styles.badge}>{user?.data?.badge}</span>
						</div>
					</div>

					<input style={{ display: 'none' }} name="owner-id" readOnly value={user?.data?.id} type="text" required />

					<span className={styles.buttonBg}>
						<SubmitButton className={styles.button} appearance="primary">Начнём</SubmitButton>
					</span>
				</form>
			</Card>
		</Container>
	)
}

export default Communities
