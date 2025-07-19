'use client'

import { Container } from '@/components/Container/Container.component'
import { Markdown } from '@/components/Markdown/Markdown.component'
import type { ReactNode } from 'react'

const Error = ({ error }: { error: { message: string } }): ReactNode => {
  return (
    <Container>
      <Markdown>{error.message}</Markdown>
    </Container>
  )
}

export default Error
