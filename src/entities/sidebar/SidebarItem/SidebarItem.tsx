import { clsx } from '@/functions/clsx'
import { Button } from '@/ui/components/Button/Button.component'
import { ButtonProps } from '@/ui/components/Button/Button.props'
import styles from './SidebarItem.module.css'

export const SidebarItem = ({ className, ...props }: ButtonProps) => {
	return (
		<Button appearance="transparent" className={clsx(className, styles.sidebarItem)} {...props} />
	)
}
