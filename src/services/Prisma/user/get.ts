export const getUser = async (id: number) => {
	const response = await fetch(`http://localhost:3000/api/user?id=${id}`)
	const json = await response.json()

	return json.data
}