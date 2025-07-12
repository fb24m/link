'use client'

import { formatDate } from '@/components/Posts/Post/formatDate'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'

import ru from 'timeago.js/lib/lang/ru'

timeago.register('ru', ru)

export const DateFormat = ({ date, format }: { date: Date, format?: 'relative' | 'absolute' }) =>
	format === 'relative' ? <TimeAgo datetime={date} locale="ru" /> : formatDate(date)