import type { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export const Container = ({ className, ...props }: HTMLAttributes<HTMLDivElement>): ReactNode => {
  return <div className={twMerge('max-w-250 mx-auto p-4 w-full', className)} {...props}></div>
}
