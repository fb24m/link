'use client'

import type { ReactNode } from 'react'
import styles from './Button.module.scss'
import type { ButtonProps } from './Button.props'
import Icon from '../Icon/Icon.component'
import Link from 'next/link'
import { clsx } from '@/functions/clsx'

export const Button = ({ appearance, className, href, icon, children, target, disabled, ...props }: ButtonProps): ReactNode => {
	const defaultProps = {
		className: clsx(styles.button, appearance && styles[appearance], className, icon && styles.icon),
		children: <>{icon && <Icon icon={icon} />} {children}</>,
		...props
	}

	if (typeof href !== 'undefined') {
		return <Link prefetch={true} href={href} target={target} {...defaultProps}></Link>
	} else {
		return <button {...{ disabled }} {...defaultProps}></button>
	}
}
