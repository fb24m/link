export const getUser = async (id: number) => {
	const response = await fetch(`https://link.fb24m.ru/api/user?id=${id}`)
	const json = await response.json()

	return json.data
}