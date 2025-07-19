'use server'

import { cookies } from 'next/headers'

export const getShortFormState = async () => {
  const cookie = await cookies()

  return cookie.get('2024_short_form_state')?.value
}
