'use client'

import { useActionState, useEffect } from 'react';
import { subscribe } from './subscribe'
import { Button } from '@/ui/components/Button/Button.component'
import { useSubscriptions } from '@/shared/store/Subscriptions.store';

export const SubscribeButton = ({ from, to, username }: { from: number, to: number, username: string }) => {
	const { subscriptions, updateSubscriptions } = useSubscriptions()
	const [actionResult, action] = useActionState(subscribe, { ok: false, data: [] })
	const subscribed = !!subscriptions && subscriptions.filter(s => s.id === to).length > 0
	console.log(subscriptions)

	useEffect(() => {
		if (actionResult.ok) {
			updateSubscriptions(actionResult.data)
		}
	}, [actionResult])

	const getSubscribedText = (subscribed: boolean) => subscribed ? "Отписаться" : "Подписаться"

	return subscriptions && <form action={action}>
		<input type="hidden" name="from" value={from} />
		<input type="hidden" name="to" value={to} />
		<input type="hidden" name="username" value={username} />
		<Button appearance={subscribed ? "filled_secondary" : "primary"}>{getSubscribedText(subscribed)}</Button>
	</form>
}
