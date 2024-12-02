import { API } from './env'

export const request = async (url: string, init?: RequestInit) => {
	const response = await fetch(`${API}${url}`, {
		...init,
		next: {
			revalidate: 60,
			tags: [url]
		}
	})
	const json = await response.json()

	return json
}