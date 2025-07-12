'use client'

import type { ReactElement } from 'react'

import { Container } from '@/components/Container/Container.component'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import styles from './loading.module.css'
import { clsx } from '@/functions/clsx'

const Loading = (): ReactElement => {
	return (
		<Container>
			<div className={styles.page}>
				<Skeleton className={clsx(styles.sidebar, styles.skeleton)} />

				<div className={styles.posts}>
					<Skeleton width="100%" height={400} />
					<Skeleton width="100%" height={200} />
					<Skeleton width="100%" height={300} />
				</div>
			</div>
		</Container>
	)
}

export default Loading
