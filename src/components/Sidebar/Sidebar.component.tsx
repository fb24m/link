import { Button } from '@/ui/components/Button/Button.component'
import { Card } from '@/ui/components/Card/Card.component'
import type { ReactElement } from 'react'
import styles from './Sidebar.module.scss'
import { exists } from '@/functions/exists'
import { Username } from '../Username/Username.component'
import { parseUser } from '@/functions/parseUser'
import { prisma } from '@/services/Prisma.service'
import { clsx } from '@/functions/clsx'

export const Sidebar = async (): Promise<ReactElement> => {
	const user = await parseUser(false, 'sidebar')
	const subsribedTo: number[] =
		exists(user?.data?.subscribedTo?.split(',').filter(item => exists(item) !== '' && !isNaN(+item)).map(item => +item))

	const ownedCommunities = await prisma.community.findMany({
		where: {
			ownerId: user?.data?.id
		}
	})

	return (
		<Card className={`${styles.sidebar} sidebar`}>
			<strong className={clsx(styles.title, styles.mainTitle)}>NextLink</strong>
			<ul className={clsx(styles.menu, styles.list)}>
				{user?.ok
					? <>
						<li><Button className={styles.button} appearance="transparent" href="/" icon="home">Главная</Button></li>
						<li><Button className={styles.button} appearance="transparent" href="/post" icon="news">Новый пост</Button></li>
						<li><Button className={styles.button} appearance="transparent" href="/profile" icon="person">Мой профиль</Button></li>
						<li><Button className={styles.button} appearance="transparent" href="/profile/saved" icon="star">Избранное</Button></li>
					</>
					: ''}
				<li><Button className={styles.button} appearance="transparent" href="https://github.com/iFB24M/link/issues" target="_blank" icon="error">Нашли ошибку?</Button></li>
			</ul>
			{user?.ok
				? <>
					<strong className={styles.title}>Подписки</strong>
					<ul className={clsx(styles.list, styles.subscriptions)}>
						{subsribedTo.length > 0
							? subsribedTo.map((item) =>
								<li key={item}><Username className={styles.button} avatar id={item} /></li>
							)
							: ''}
					</ul>
				</>
				: ''}

			{ownedCommunities.length > 0 && <>
				<strong className={styles.title}>Сообщества</strong>

				<ul className={styles.list}>
					{ownedCommunities.map((item) =>
						<li key={item.id}><Button href={`/communities/${item.id}`} appearance="transparent">{item.name}</Button></li>
					)}
				</ul>
			</>}

			{!user?.ok ? <Button appearance="primary" href="/login" className={styles.loginButton}>Войти</Button> : ''}
			<div className={styles.cookies}>
				<span>🍪</span>NextLink тоже использует Cookies
			</div>
		</Card >
	)
}
