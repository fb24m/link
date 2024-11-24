export interface IComment {
	publishDate: Date
	id: number
	authorId: number
	content: string
	postId?: number
}
