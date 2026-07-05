'use client'

import { type ReactElement } from 'react'
import { useCopyToClipboard } from '@/shared/hooks/useCopyToClipboard'
import { Button, ButtonProps } from '@/shared/ui/Button/Button.component'
import toast from 'react-hot-toast'

export interface CopyButtonProps extends ButtonProps<'button'> {
  text: string
  success: string
}

export const CopyButton = ({ text, success, ...props }: CopyButtonProps): ReactElement => {
  const copy = useCopyToClipboard(text)

  const handleCopy = () => {
    copy()
    toast.success(success.split('$0').join(text))
  }

  return <Button {...props} onClick={handleCopy} />
}
