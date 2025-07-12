import localFont from 'next/font/local'

export const iconFont = localFont({
	preload: false,
	weight: '300',
	src: './material.woff2',
	display: 'swap'
})
