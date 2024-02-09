import styles from './page.module.scss'

import type { IDisplayMessage } from '@/components/Messenger/Messages/DisplayMessage.interface'
import type { ReactElement } from 'react'

import { addMessage } from '@/actions/addMessage.action'
import { generateChatName } from '@/services/Prisma/generateChatName'
import { getMessages } from '@/services/Prisma/message/get'

import { exists } from '@/functions/exists'

import { Messages } from '@/components/Messenger/Messages/Messages.component'
import { Container } from '@/components/Container/Container.component'
import { Input } from '@/ui/components/Input/Input'
import { Button } from '@/ui/components/Button/Button.component'
import { parseUser } from '@/functions/parseUser'

const Messenger = async ({ params }: { params: { username: string } }): Promise<ReactElement> => {
	/* Код извлекает информацию о пользователе, генерирует имя чата на основе предоставленного имени
	пользователя и имени пользователя, а затем извлекает сообщения для этого чата. */
	const user = await parseUser(false, 'messenger')
	const chatName = await generateChatName(params.username, exists<string>(user?.data?.username))
	const messages = await getMessages(chatName)

	/* Блок кода проверяет, выполняется ли код в среде браузера (на стороне клиента), проверяя, определен
	ли объект Window. Если это так, это означает, что код выполняется в браузере, а не в среде
	рендеринга на стороне сервера. */
	if (typeof window !== 'undefined') {
		document.documentElement.scrollIntoView({
			block: 'end',
			behavior: 'smooth'
		})
	}

	if (!user) {
		console.error('user does not exist in Messenger in @/app/user/[username]/messenger/page.tsx')
		return <>user not found</>
	}

	if (!user.data) return <Container>{user.message}</Container>

	return (
		<main className={styles.main}>
			<Container className={styles.container}>
				<div className={styles.sidebar}>
					<div className={styles.user}>
						<span className={styles.username}>fb24m</span>
						<span className={styles.message}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, vero consequuntur aliquid eaque odio nostrum facere ullam repellat pariatur doloribus quasi cum dolor veritatis enim corrupti atque ducimus quaerat velit.</span>
					</div>
				</div>
				<div className={styles.messenger}>
					<Messages user={user.data} messages={messages as IDisplayMessage[]} />
					<form action={addMessage} className={styles.form}>
						<Container className={styles.formContainer}>
							<input style={{ display: 'none' }} readOnly value={params.username} name="companion-username" />
							<Input className={styles.input} placeholder="Напишите сообщение..." required name="new-message" autoComplete="off" />
							<Button className={styles.button} icon="send" appearance="primary"></Button>
						</Container>
					</form>
				</div>
			</Container>
		</main>
	)
}

export default Messenger
