'use client'

import { Link } from '@/shared/ui/Link/Link'
import { usePathname } from 'next/navigation'
import { AnchorHTMLAttributes } from 'react'

export interface ReadMoreProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  show: boolean
  postId: number
}

export const ReadMore = ({ show, postId, ...props }: ReadMoreProps) => {
  const pathname = usePathname()

  return (
    show && <Link href={`/article/${postId}?prev=${pathname}`} {...props} />
  )
}
