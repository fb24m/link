'use client'

import type { ReactElement } from 'react'

import { Container } from '@/shared/ui/Container'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

const Loading = (): ReactElement => {
  return (
    <Container>
      <div className="flex p-4 gap-4">
        <Skeleton className="basis-80 h-180" />

        <div className="flex flex-col gap-4 basis-full">
          <Skeleton width="100%" height={400} />
          <Skeleton width="100%" height={200} />
          <Skeleton width="100%" height={300} />
        </div>
      </div>
    </Container>
  )
}

export default Loading
