import type { ReactElement } from 'react'

import styles from '@/scss/forms.module.scss'
import type { Metadata } from 'next'
import { Card } from '@/ui/components/Card/Card.component'
import { LoginForm } from '@/features/LoginForm/LoginForm'
import { Logo } from '@/components/Logo/Logo.component'
import Link from 'next/link'
import { Popup } from '@/ui/components/Popup/Popup.component'
import { PopupWrapper } from '@/ui/components/PopupWrapper/PopupWrapper.component'
import { Eval } from '@/components/Eval/Eval.component'
import { PopupFooter } from '@/ui/components/PopupFooter/PopupFooter.component'
import { PopupTrigger } from '@/ui/components/PopupTrigger/PopupTrigger.component'
import { Button } from '@/ui/components/Button/Button.component'

export const metadata: Metadata = {
	title: 'Вход - NextLink',
	description: 'Войдите в аккаунт на NextLink, чтобы смотреть читать посты и подписываться на друзей',
	openGraph: {
		title: 'Вход - NextLink',
		description: 'Войдите в аккаунт на NextLink, чтобы смотреть читать посты и подписываться на друзей'
	}
}

const Welcome = async (): Promise<ReactElement> => {
	return (
		<div className={styles.login}>
			<div className={styles.content}>
				<div className={styles.welcome}>
					<div className={styles.greeting}>
						<Logo inverted />
					</div>

					<div className={styles.advantagesBlock}>
						<h1 className={styles.title}>Привет</h1>

						<div className={styles.advantages}>
							<Card className={styles.advantage}>
								<h3 className={styles.advantageTitle}>Открытые профили</h3>
								<p className={styles.advantageDescription}>Вы можете делиться любыми статьями с&nbsp;друзьями без&nbsp;мыслей о&nbsp;том, сможет ли он ее прочитать</p>
							</Card>
							<Card className={styles.advantage}>
								<h3 className={styles.advantageTitle}>Безопасность</h3>
								<div className={styles.advantageDescription}>
									Все ваши данные под надежной защитой.
									<br /> <br />
									<Popup className={styles.popup}>
										<PopupWrapper>
											<Eval>
												<p>
													Как изменить аватар?
												</p>
												<ol>
													<li>Зарегистрируйтесь на сайте <a target="_blank" rel="noreferrer" href="https://gravatar.com">gravatar.com</a>, используя ту же почту, которую использвали для регистрации в NextLink</li>

													<li>Загрузите аватар и заполните профиль в Gravatar</li>

													<li>Готово! Загрузка аватара в NextLink может занять до 15 минут</li>
												</ol>
											</Eval>
											<PopupFooter />
										</PopupWrapper>
										<PopupTrigger>
											<Button className={styles.changeButton} appearance="primary">Подробнее</Button>
										</PopupTrigger>
									</Popup>
								</div>
							</Card>
							<Card className={styles.advantage}>
								<h3 className={styles.advantageTitle}>Мини-приложения</h3>
								<p className={styles.advantageDescription}>Бесконечный простор для&nbsp;разработки новых возможностей NextLink</p>
							</Card>
							<Card className={styles.advantage}>
								<h3 className={styles.advantageTitle}>Свобода действий</h3>
								<p className={styles.advantageDescription}>Удаляйте, изменяйте и&nbsp;пишите посты когда захотите, меняйте свой профиль под&nbsp;себя</p>
							</Card>
						</div>
					</div>

					<div className={styles.info}>
						<Link className={styles.author} href="https://www.fb24m.ru/">developed by fb24m</Link>
						<span className={styles.years}>2023-2025</span>
					</div>
				</div>

			</div>


			<div className={styles.loginBlock}>
				<h2 className={styles.loginTitle}>Вход</h2>

				<LoginForm />
			</div>
		</div>
	)
}

export default Welcome
