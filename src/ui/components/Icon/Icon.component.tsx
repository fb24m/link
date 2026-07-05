import { memo, type ReactNode } from 'react'
import styles from './Icon.module.scss'
import { iconFont } from '@/shared/styles/fonts'
import type { IconProps } from './Icon.props'
import clsx from 'clsx'

const Icon = memo(({ icon, className, ...props }: IconProps): ReactNode => {
  return (
    <i className={clsx(styles.icon, iconFont.className, className)} {...props}>
      {icon}
    </i>
  )
})
Icon.displayName = 'Icon'

export default Icon
