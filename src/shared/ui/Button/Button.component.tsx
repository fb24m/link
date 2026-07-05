'use client'

import type { ElementType, ReactNode } from 'react'
import styles from './Button.module.scss'
import Icon from '@/ui/components/Icon/Icon.component'
import Link, { useLinkStatus } from 'next/link'
import { clsx } from 'clsx'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { useFormStatus } from 'react-dom'
import { Spinner } from '@/ui/components/Spinner/Spinner.component'
import { Ripple } from 'm3-ripple'
import 'm3-ripple/ripple.css'

import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type LoaderType = 'skeleton' | 'spinner'
export type Appearance = 'primary' | 'elevated' | 'text' | 'outlined' | 'tonal'
export type Size = 'sm' | 'md' | 'lg'

type ButtonSelfProps<E extends ElementType> = {
  as?: E
  appearance?: Appearance
  size?: Size
  loader?: LoaderType
  isLoading?: boolean
  icon?: string
}

export type ButtonProps<E extends ElementType> = ButtonSelfProps<E> & Omit<ComponentProps<E>, keyof ButtonSelfProps<E>>

export const Button = <E extends ElementType = 'button'>({
  as,
  className,
  appearance = 'primary',
  size = 'md',
  loader,
  icon,
  isLoading,
  children,
  ...props
}: ButtonProps<E>): ReactNode => {
  const El: ElementType = as === 'link' ? Link : as || 'button'

  const linkStatus = useLinkStatus()
  const formStatus = useFormStatus()

  const loaderEl: Record<LoaderType, ReactNode> = {
    skeleton: (
      <div className={clsx(styles.loader, styles.skeleton)}>
        <Skeleton className={styles.loader} width="100%" height="100%"></Skeleton>
      </div>
    ),
    spinner: (
      <div className={clsx(styles.loader, styles.spinner, 'bg-primary rounded-full inset-0')}>
        <Spinner size={18} />
      </div>
    ),
  }

  const iconSizes = { sm: 'text-md', md: 'text-2xl!', lg: 'text-3xl!' }

  const buttonContent = (
    <>
      {(linkStatus.pending || formStatus.pending || isLoading) && loader && loaderEl[loader]}
      {icon && <Icon className={iconSizes[size]} icon={icon} />} {children}
    </>
  )

  const sizes: { icon: Record<Size, string>; noIcon: Record<Size, string> } = {
    noIcon: { sm: 'text-xs px-2.5 py-2.5', md: 'px-3.75 py-2.5 text-sm', lg: 'px-5.75 py-4.25 text-md' },
    icon: { sm: 'text-xs px-2.5 py-1.25', md: 'px-2.25 py-1.5 text-sm', lg: 'px-4.5 py-2.75 text-md gap-2.5' },
  }

  const appearances: Record<Appearance, string> = {
    primary: 'bg-primary text-on-primary',
    elevated: 'text-primary',
    text: 'p-0 rounded-none text-primary',
    outlined: 'border-outline-variant text-on-surface-variant',
    tonal: 'bg-secondary-container text-on-secondary-container',
  }

  return (
    <El
      className={twMerge(
        'select-none rounded-full relative flex items-center gap-1 font-medium cursor-pointer border border-transparent',
        icon ? sizes.icon[size] : sizes.noIcon[size],
        appearances[appearance],
        className,
        icon && styles.icon
      )}
      {...props}
    >
      <Ripple />
      {buttonContent}
    </El>
  )
}
