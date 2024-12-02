import { Markdown } from '@/components/Markdown/Markdown.component'

const Page = async (props: { params: Promise<{ id: string }> }) => {
	const id = (await props.params).id

	const response = await fetch(`/md/${id}.md`)
	const page = await response.text()

	return (
		<div>
			<Markdown>
				{page}
			</Markdown>
		</div>
	)
}

export default Page