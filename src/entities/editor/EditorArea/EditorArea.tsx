'use client'
import { useState } from 'react'
import styles from './EditorArea.module.css'

export const EditorArea = ({ defaultValue }: { defaultValue?: string }) => {
	const [text, setText] = useState(defaultValue ?? '')

	return (
		<>
			<div className={styles.postEditor}>
				<textarea
					className={styles.textarea}
					name="content"
					placeholder="Текст поста"
					defaultValue={defaultValue}
					onInput={(e) => {
						setText((e.target as HTMLInputElement).value)
					}}
				/>
			</div>
			<div className={styles.statusbar}>
				<div className={styles.statusbarItem}>
					Символы {text.length}
				</div>
				<div className={styles.statusbarItem}>
					Слова: {text.length < 1 ? text.split(' ').length - 1 : text.split(' ').length}
				</div>
				<div className={styles.statusbarItem}>
					Время чтения: {text.length <= 500 ? 'меньше минуты' : Math.floor(text.length / 500) + ' мин.'}
				</div>
			</div>
		</>
	)
}