import { clsx } from 'clsx'
import { Button } from '@/shared/ui/Button/Button.component'
import { ButtonProps } from '@/shared/ui/Button/Button.props'
import styles from './SidebarItem.module.css'

export const SidebarItem = ({ className, ...props }: ButtonProps) => {
  return <Button appearance="transparent" className={clsx(className, styles.sidebarItem)} {...props} />
}
