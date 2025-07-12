export const GET = async (request: Request): Promise<Response> => {
	if (!request) return new Response('400')

	const file = await fetch('https://fb24m.site/next-link-web-components/css/style.min.css')
	if (file.ok) {
		const text = await file.text()
		return new Response(text)
	}

	return new Response('this file not found')
}
