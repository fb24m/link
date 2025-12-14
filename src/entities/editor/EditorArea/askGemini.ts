'use server'

import { users } from '@/shared/api/users'

export const askGemini = async (): Promise<string> => {
  const response = await users.getGemini()

  return response.response
}
