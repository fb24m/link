'use client'

import { useState, type ReactNode } from 'react'
import type { BurgerProps } from './Burger.props'
import styles from './Burger.module.scss'
import { toggleState } from '@/functions/toggleState'
import Icon from '@/ui/components/Icon/Icon.component'

const Burger = ({ className, openedClass, ...props }: BurgerProps): ReactNode => {
	const [openedClassName, setOpenedClassName] = useState('')

	const toggleClassName = (): void => {
		toggleState(openedClassName, setOpenedClassName, openedClass)
	}

	return (
		<div onClick={toggleClassName} className={`${className} ${openedClassName} ${styles.burger}`} {...props}>
			<Icon icon="menu" className={styles.icon} />
		</div>
	)
}

export default Burger
