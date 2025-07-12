import { create } from 'zustand'

export interface SubscrtiptionsStore {
	subscriptions: { id: number, username: string }[] | null,
	updateSubscriptions: (data: { id: number, username: string }[]) => void
}

export const useSubscriptions = create<SubscrtiptionsStore>((set) => ({
	updateSubscriptions: (data: { id: number, username: string }[]) => set({ subscriptions: data }),
	subscriptions: null
})) 