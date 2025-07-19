export const GET = async (
  request: Request,
  props: { params: Promise<{ name: string }> }
): Promise<Response> => {
  const params = await props.params
  if (!request) return new Response('400')

  const file = await fetch(
    `https://fb24m.site/next-link-web-components/js/${params.name}.js`
  )
  if (file.ok) {
    const text = await file.text()
    return new Response(text)
  }

  return new Response('this file not found')
}
