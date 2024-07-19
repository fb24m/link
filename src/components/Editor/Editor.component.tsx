import styles from './Editor.module.scss'
import { updatePost } from '@/actions/updatePost.action'
import type { ReactElement, ReactNode } from 'react'
import type { IPost } from '@/interfaces/IPost.interface'
import { createPost } from '../../actions/createPost.action'
import { exists } from '@/functions/exists'
import { SubmitButton } from '@/components/SubmitButton/SubmitButton.component'
import Link from 'next/link'
import { parseUser } from '@/functions/parseUser'

export interface EditorProps {
	post?: IPost
	button?: ReactNode
	publishDate?: Date
	new?: boolean
	user?: { name: string | null }
}

export const Editor = async (props: EditorProps): Promise<ReactElement> => {
	const now = typeof props.post?.publishDate !== 'undefined' ? props.post?.publishDate : props.publishDate
	const date = `${now?.getDate()}.${exists(now?.getMonth()) + 1}.${now?.getFullYear()}`
	const author = await parseUser(true)

	return (
		<form action={props.new === true ? createPost : updatePost} className={styles.form}>
			<input type="text" style={{ display: 'none' }} name="id" readOnly value={props.post?.id} />
			<div className={styles.post}>
				<textarea
					className={styles.textarea}
					name="content"
					id=""
					placeholder="Текст поста"
					defaultValue={props.post?.content.split('<br>').join('\n')}
				/>
			</div>
			<div className={styles.sidebar}>
				<div className={styles.sidebarBlock}>
					<span className={styles.title}>Изменить пост</span>
				</div>
				{props.user?.name &&
					<div className={styles.sidebarBlock}>
						Публикация: <input type="text" name="author" readOnly value={props.user?.name} />
					</div>
				}
				<div className={styles.sidebarBlock}>
					Автор: <input type="text" name="written-by" readOnly value={author?.data?.username} />
				</div>
				<div className={styles.sidebarBlock}>
					Дата публикации: {date}
				</div>
				<details className={styles.instruction}>
					<summary>Форматирование</summary>
					<p>
						**<strong>жирный текст</strong>**
					</p><p>
						*<i>курсивный текст</i>*
					</p><p>
						~~<del>зачеркнутый текст</del>~~
					</p>
					<Link href="/article/86">Подробнее</Link>
				</details>
				<SubmitButton className={styles.button} icon={props.new === true ? 'add_circle' : 'update'}>
					{props.new === true ? 'Создать' : 'Изменить'}
				</SubmitButton>
			</div>
		</form>
	)
}
