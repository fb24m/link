/**
 * Эта функция TypeScript извлекает пользователя из базы данных, используя его имя пользователя, и
 * возвращает ответ JSON с информацией о пользователе, исключая его пароль.
 * @param {NextRequest} request - Параметр request — это объект, который представляет входящий
 * HTTP-запрос. Он содержит такую информацию, как метод запроса, заголовки и тело.
 * @param  - Фрагмент кода представляет собой серверную функцию, написанную на TypeScript с
 * использованием платформы Next.js. Он определяет обработчик запроса GET, который извлекает
 * пользователя из базы данных Prisma на основе предоставленного параметра имени пользователя.
 * @returns Код возвращает ответ JSON со следующими свойствами:
 * - ok: логическое значение, указывающее, был ли запрос успешным.
 * - код: целочисленное значение, представляющее код состояния ответа.
 * - сообщение: строковое значение, описывающее результат запроса.
 * - пользователь: объект, содержащий данные пользователя, для свойства пароля которого установлено
 * значение undef, чтобы гарантировать, что он не будет включен в ответ.
 */
import { gravatar } from '@/services/gravatar.service'
import { prisma } from '@/services/Prisma.service'
import type { NextRequest } from 'next/server'

// TODO: Fix typization
export const GET = async (request: NextRequest, props: any): Promise<any> => {
	const queryParams = new URLSearchParams(new URL(request.url).search)

	const id = queryParams.get('id') ? +queryParams.get('id')! : 0
	const username = queryParams.get('username') ? queryParams.get('username')! : ''

	const user = await prisma.user.findFirst({
		where: {
			...id ? { id } : {},
			...username ? { username } : {},
		}
	})

	if (!user) {
		return Response.json({ ok: true, code: 404, message: 'Not found' })
	}

	const avatar = await gravatar.getAvatar(user?.email ?? '')

	const safeUser = {
		...user,
		password: undefined,
		savedArticles: user?.savedArticles?.split('/').map(item => +item).filter(item => item),
		avatar: avatar.entry?.[0].thumbnailUrl
	}

	return Response.json({ ok: true, code: 200, message: 'success', data: safeUser })
}
