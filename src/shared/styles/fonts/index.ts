import { Unbounded } from 'next/font/google'
import localFont from 'next/font/local'

export const iconFont = localFont({ preload: false, weight: '300', src: './material.woff2', display: 'swap' })

export const unbounded = Unbounded({ preload: false, display: 'swap', weight: 'variable' })
