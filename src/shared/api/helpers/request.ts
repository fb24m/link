export const request = async (url: string, init?: RequestInit) => {
	const response = await fetch(url, init)
	const json = await response.json()

	return json
}