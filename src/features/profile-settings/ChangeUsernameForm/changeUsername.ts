'use server'

import { users } from '@/shared/api/users'
import { isUsernameValid } from './isUsernameValid'

export const changeUsername = async (_: unknown, formData: FormData) => {
  const username = formData.get('username')?.toString() ?? ''

  const isValid = isUsernameValid(username)

  if (!isValid.valid) {
    return isValid.message
  }

  const sameUsernameUser = await users.get(username)

  if (sameUsernameUser) {
    return 'Имя пользователя недоступно'
  }

  await users.changeUsername(username)
}
