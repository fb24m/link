import { clsx } from '@/functions/clsx'
import styles from './Skeleton.module.css'

export const Skeleton = ({ width, height, className }: { width?: number | string, height?: number | string, className?: string } = { width: 200, height: 200 }) => {
	return (
		<div className={clsx(styles.skeleton, className)} style={{ width, height }}></div>
	)
}