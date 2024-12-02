'use client'

import styles from './Menu.module.css'
import { ReactNode, useState } from 'react'
import { clsx } from '@/functions/clsx'
import { SidebarItem } from '../SidebarItem/SidebarItem'

export const Menu = ({ list, opened, title, icon }: { list: ReactNode, opened?: 'default' | 'desktop' | 'always', title: string, icon: string }) => {
	const [isOpened, setIsOpened] = useState(false)

	return (
		<>
			<SidebarItem icon={icon} className={styles.button} onClick={() => { setIsOpened(!isOpened) }}>{title}</SidebarItem>

			<div className={clsx(styles.menu, opened === 'desktop' && styles.desktopOpened, isOpened && styles.opened)}>
				<ul className={clsx(styles.list)}>
					{list}
				</ul>
			</div>
		</>
	)
}
