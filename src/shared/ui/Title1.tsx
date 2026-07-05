import type { ReactNode } from 'react'
import type { TextComponentProps } from '@/ui/interfaces/TextComponent.props'
import { twMerge } from 'tailwind-merge'
import { unbounded } from '../styles/fonts'

export const Title1 = ({ className, ...props }: TextComponentProps): ReactNode => {
  return <h1 className={twMerge(unbounded.className, 'text-4xl font-medium -mt-1.5', className)} {...props}></h1>
}
