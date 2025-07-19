'use client'

import { Input } from '@/ui/components/Input/Input'
import type { ReactElement } from 'react'
import type { SearchProps } from './Search.props'
import { useMedia } from '@/hooks/useMedia'

export const Search = (props: SearchProps): ReactElement => {
  const media = useMedia(props.only)

  return (
    <>
      {media && (
        <form action='' style={{ flexBasis: 240 }}>
          <Input placeholder='Найти...' style={{ width: '100%' }} />
        </form>
      )}
    </>
  )
}
