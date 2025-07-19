import type { ReactNode } from 'react'
import styles from './Icon.module.scss'
import { iconFont } from '@/shared/styles/fonts'
import type { IconProps } from './Icon.props'

const Icon = ({ icon, className, ...props }: IconProps): ReactNode => {
  return (
    <i className={`${styles.icon} ${iconFont.className} ${className}`} {...props}>
      {icon}
    </i>
  )
}

export default Icon
