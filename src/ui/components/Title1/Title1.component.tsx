import type { ReactNode } from 'react'
import styles from './Title1.module.scss'
import type { TextComponentProps } from '@/ui/interfaces/TextComponent.props'

export const Title1 = ({
  className,
  ...props
}: TextComponentProps): ReactNode => {
  return <h1 className={`${styles.title1} ${className}`} {...props}></h1>
}
