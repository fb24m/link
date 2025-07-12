export const formatContent = (content: string): string => {
	content = content.split('/**').join('</strong>')
	content = content.split('**').join('<strong>')
	content = content.split('/__').join('</i>')
	content = content.split('__').join('<i>')
	content = content.split('/~~').join('</del>')
	content = content.split('~~').join('<del>')

	return content
}
