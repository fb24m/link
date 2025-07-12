export const exists = <T>(input: T | null | undefined): T => {
	if (typeof input !== 'undefined' && input !== null) return input
	else return '' as T
}
