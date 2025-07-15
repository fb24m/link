'use client'

import { Button } from '@/ui/components/Button/Button.component'
import type { ButtonProps } from '@/ui/components/Button/Button.props'
import { useRouter } from 'next/navigation'
import type { ReactElement } from 'react'

export const BackButton = (props: ButtonProps): ReactElement => {
	const router = useRouter()

	return (
		<div onClick={() => { router.back() }}>
			<Button {...props}></Button>
      
		</div>
	)
}
