'use client'

import type { CopyButtonProps } from './CopyButton.props'
import { type ReactElement } from 'react'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { Button } from '@/ui/components/Button/Button.component'
import toast from 'react-hot-toast'

export const CopyButton = ({ text, success, ...props }: CopyButtonProps): ReactElement => {
  const copy = useCopyToClipboard(text)

  const handleCopy = () => {
    copy()
    toast.success(success.split('$0').join(text))
  }

  return <Button {...props} onClick={handleCopy} />
}
