export const request = async (url: string, init?: RequestInit) => {
	const response = await fetch(url, {
		...init,
		next: {
			revalidate: 60
		}
	})
	const json = await response.json()

	return json
}