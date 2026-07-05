import { clsx } from 'clsx'
import { Button } from '@/shared/ui/Button/Button.component'
import { type ButtonProps } from '@/shared/ui/Button/Button.component'
import styles from './SidebarItem.module.css'

export const SidebarItem = ({ className, ...props }: ButtonProps<'button'>) => {
  return <Button as="button" appearance="elevated" className={clsx(className, styles.sidebarItem)} {...props} />
}
