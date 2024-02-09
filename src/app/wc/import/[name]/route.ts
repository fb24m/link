export const GET = async (request: Request, { params }: { params: { name: string } }): Promise<Response> => {
	if (!request) return

	const file = await fetch(`https://fb24m.site/next-link-web-components/js/${params.name}.js`)
	if (file.ok) {
		const text = await file.text()
		return new Response(text)
	}

	return new Response('this file not found')
}
