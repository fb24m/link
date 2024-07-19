'use client'

import type { ReactNode } from 'react'
import styles from './not-found.module.scss'
import { Button } from '@/ui/components/Button/Button.component'

const NotFound = (): ReactNode => {
	return (
		<div className={styles.notFound}>
			<div className={styles.wrapper}>
				<div className={styles.error}>
					<span className={styles.code}>404</span>
					<div className={styles.errorBody}>
						<p className={styles.errorText}>Эта страница не&nbsp;существует</p>
						<div className={styles.buttons}>
							<Button href="/" appearance="primary" icon="home">На главную</Button>
							<Button href="/profile" appearance="secondary" icon="person">Профиль</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NotFound
