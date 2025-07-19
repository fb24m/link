'use client'

import { Button } from '@/ui/components/Button/Button.component'
import { ButtonProps } from '@/ui/components/Button/Button.props'
import Link from 'next/link'
import { ReactNode } from 'react'

export interface LinkProps extends ButtonProps {
  children?: ReactNode
  href: string
  target?: '_blank' | '_parent' | '_self' | '_top'
}

export const LButton = ({ href, children, target, ...props }: LinkProps) => {
  return (
    <Link href={href} target={target}>
      {' '}
      <Button {...props}>{children}</Button>{' '}
    </Link>
  )
}
