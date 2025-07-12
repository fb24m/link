'use client'

import { useSubscriptions } from '@/shared/store/Subscriptions.store';
import { useEffect } from 'react'

export const UpdateSubscriptions = () => {
	const { updateSubscriptions } = useSubscriptions();
	useEffect(() => {
		fetch('/api/subscriptions').then(r => r.json()).then(({ data }) => updateSubscriptions(data))
	}, [])

	return <></>
}