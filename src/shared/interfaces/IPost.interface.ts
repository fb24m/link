export interface IPost {
	publishDate?: Date | null
	id: number
	title: string
	content: string
	imageUrl?: string | null
	authorId?: number | null
	deleted?: boolean | null
	likes?: number | null
	liked?: string | null
	writtenBy?: number | null
}
