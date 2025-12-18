'use server'

import { users } from '@/shared/api/users'

export const askGemini = async (prompt?: string, source?: string): Promise<string> => {
  const response = await users.getGemini(prompt, source)

  return response.response
}
