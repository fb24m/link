export interface IResponse<T> {
	ok?: boolean
	code?: number
	message?: string
	data?: T
}
