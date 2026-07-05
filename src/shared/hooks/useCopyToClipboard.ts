import { useEffect, useState } from 'react'

export const useCopyToClipboard = (textToCopy: string): (() => void) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(textToCopy).catch((error) => {
        console.log(error)
      })
      setCopied(false)
    }
  }, [copied])

  return () => {
    setCopied(true)
  }
}
