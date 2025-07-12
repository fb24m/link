'use client'

import type { CopyButtonProps } from './CopyButton.props'
import { type ReactElement } from 'react'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { PopupWrapper } from '@/ui/components/PopupWrapper/PopupWrapper.component'
import { Popup } from '@/ui/components/Popup/Popup.component'
import { PopupFooter } from '@/ui/components/PopupFooter/PopupFooter.component'
import { PopupTrigger } from '@/ui/components/PopupTrigger/PopupTrigger.component'
import { Button } from '@/ui/components/Button/Button.component'

export const CopyButton = ({ text, success, ...props }: CopyButtonProps): ReactElement => {
	const copy = useCopyToClipboard(text)

	return (
		<Popup>
			<PopupWrapper>
				{success?.split('$0').join(text)}
				<PopupFooter></PopupFooter>
			</PopupWrapper>
			<PopupTrigger>
				<div onClick={() => { copy() }}>
					<Button {...props} />
				</div>
			</PopupTrigger>
		</Popup>
	)
}
