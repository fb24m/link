export const request = async<T>(url: string): Promise<T> => {
	const response = await fetch(url, {
		next: {
			revalidate: 15 * 60,
			tags: [url]
		}
	})
	const json: T = await response.json()

	return json
}
