'use client'

import { Button, type ButtonProps } from '@/shared/ui/Button/Button.component'
import { useRouter } from 'next/navigation'
import type { ReactElement } from 'react'

export const BackButton = (props: ButtonProps<'button'>): ReactElement => {
  const router = useRouter()

  return <Button onClick={router.back} {...props}></Button>
}
