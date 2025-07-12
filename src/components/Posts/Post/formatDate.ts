const months = [
	'янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'нояб', 'дек'
]

export const formatDate = (date: Date | undefined | null): string => {
	if (!date) return '1 янв 1970, 00:00'

	date = new Date(date)

	const day = date.getDate()
	const month = months[date.getMonth()]
	const year = date.getFullYear()

	const hour = date.getHours()
	const minutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()

	return `${day} ${month} ${year}, ${hour}:${minutes}`
}
