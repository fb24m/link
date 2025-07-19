'use client'

import type { ReactNode } from 'react'
import styles from './Button.module.scss'
import type { ButtonProps, LoaderType } from './Button.props'
import Icon from '../Icon/Icon.component'
import { useLinkStatus } from 'next/link'
import { clsx } from '@/functions/clsx'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { useFormStatus } from 'react-dom'
import { Spinner } from '../Spinner/Spinner.component'

export const Button = ({
  appearance,
  className,
  icon,
  children,
  disabled,
  loader,
  ...props
}: ButtonProps): ReactNode => {
  const linkStatus = useLinkStatus()
  const formStatus = useFormStatus()

  const loaderEl: Record<LoaderType, ReactNode> = {
    skeleton: (
      <div className={clsx(styles.loader, styles.skeleton)}>
        <Skeleton className={styles.loader} width='100%' height='100%'></Skeleton>
      </div>
    ),
    spinner: (
      <div className={clsx(styles.loader, styles.spinner)}>
        <Spinner stroke='var(--background-color)' size={18} />
      </div>
    ),
  }

  const buttonContent = (
    <>
      {(linkStatus.pending || formStatus.pending) && loader && loaderEl[loader]}
      {icon && <Icon icon={icon} />} {children}
    </>
  )

  const defaultProps = {
    className: clsx(styles.button, appearance && styles[appearance], className, icon && styles.icon),
    children: buttonContent,
    ...props,
  }

  return <button {...{ disabled }} {...defaultProps}></button>
}
