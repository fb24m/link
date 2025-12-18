'use server'

import { exists } from '@/functions/exists'
import { users } from '@/shared/api/users'

export const updateBio = async (formData: FormData): Promise<void> => {
  const newBio = exists(formData.get('new-bio')) as string

  await users.update({ bio: newBio })
}
